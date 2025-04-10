import * as Yup from "yup";

import AppError from "../../errors/AppError";
import Schedule from "../../models/Schedule";
import moment from "moment-timezone";

interface Request {
  body: string;
  sendAt: string;
  contactId: number | string;
  companyId: number | string;
  userId?: number | string;
  timeZone?: string
}

const CreateService = async ({
  body,
  sendAt,
  contactId,
  companyId,
  userId,
  timeZone
}: Request): Promise<Schedule> => {
  const schema = Yup.object().shape({
    body: Yup.string().required().min(5),
    sendAt: Yup.string().required()
  });

  try {
    await schema.validate({ body, sendAt });
  } catch (err: any) {
    throw new AppError(err.message);
  }

  let dataInicial = moment.tz(sendAt, timeZone);
  sendAt = dataInicial.utc().format("YYYY-MM-DD HH:mm:ss")

  const schedule = await Schedule.create(
    {
      body,
      sendAt,
      contactId,
      companyId,
      userId,
      status: 'PENDENTE'
    }
  );

  await schedule.reload();

  return schedule;
};

export default CreateService;
