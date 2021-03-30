/* Serviços:Onde fica a regra de negócio da aplicação,cada servoço tem uma função específica */
/* Todos os services só possuem um método,execute() */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import Appointment from '../models/Appointment.model';

import AppError from '../errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request):Promise<Appointment>{
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate)
 
    if(findAppointmentInSameDate){
      throw new AppError('This date is already booked',400)

    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date:appointmentDate
    });

    await appointmentsRepository.save(appointment)

    return appointment
    }

}

export default CreateAppointmentService;
