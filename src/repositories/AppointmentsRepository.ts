import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment.model';

/* REPOSITÓRIO: Local onde o dado rece alterações,listagens,qualquer tipo de manutenção */
//  DTO:Data transfer object

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: { date },
    });
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
