import AppError from "../../errors/AppError";
import CheckContactOpenTickets from "../../helpers/CheckContactOpenTickets";
import GetDefaultWhatsApp from "../../helpers/GetDefaultWhatsApp";
import Ticket from "../../models/Ticket";
import ShowContactService from "../ContactServices/ShowContactService";
import { getIO } from "../../libs/socket";
import GetDefaultWhatsAppByUser from "../../helpers/GetDefaultWhatsAppByUser";
import ShowWhatsAppService from "../WhatsappService/ShowWhatsAppService";
import { logger } from "../../utils/logger";

interface Request {
  contactId: number;
  status: string;
  userId: number;
  companyId: number;
  queueId?: number;
  whatsappId?: string;
}

const CreateTicketService = async ({
  contactId,
  status,
  userId,
  queueId,
  companyId,
  whatsappId
}: Request): Promise<Ticket> => {
  let whatsapp;
  logger.info("Começando criação message")
  if (whatsappId !== undefined && whatsappId !== null && whatsappId !== "") {
    whatsapp = await ShowWhatsAppService(whatsappId, companyId)
  }
  logger.info(`Intancia encontrada: ${whatsapp != null}`)

  let defaultWhatsapp = await GetDefaultWhatsAppByUser(userId);
  logger.info(`Intancia DEFAULT: ${defaultWhatsapp != null}`)
  if (whatsapp) {
    defaultWhatsapp = whatsapp;
  }
  if (!defaultWhatsapp)
    defaultWhatsapp = await GetDefaultWhatsApp(companyId);
  logger.info(`Chegarem de contato`)
  await CheckContactOpenTickets(contactId, whatsappId);

  const { isGroup } = await ShowContactService(contactId, companyId);
  logger.info(`Inicio Criação`)
  const [{ id }] = await Ticket.findOrCreate({
    where: {
      contactId,
      companyId,
      whatsappId
    },
    defaults: {
      contactId,
      companyId,
      whatsappId: defaultWhatsapp.id,
      status,
      isGroup,
      userId
    }
  });
  logger.info(`Fim Criação`)
  await Ticket.update(
    { companyId, queueId, userId, whatsappId: defaultWhatsapp.id, status: "open" },
    { where: { id } }
  );
  logger.info(`Atualiza Criação`)
  const ticket = await Ticket.findByPk(id, { include: ["contact", "queue"] });

  if (!ticket) {
    throw new AppError("ERR_CREATING_TICKET");
  }

  const io = getIO();

  io.to(ticket.id.toString()).emit("ticket", {
    action: "update",
    ticket
  });

  return ticket;
};

export default CreateTicketService;
