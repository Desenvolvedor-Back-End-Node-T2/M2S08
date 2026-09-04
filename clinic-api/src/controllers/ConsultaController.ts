import {Request, Response} from "express"
import { AppDataSource } from "../data-source";
import { Medico } from '../entities/Medico'
import { Paciente } from '../entities/Paciente'
import { UsuarioRole } from '../entities/Usuario'
import { Consulta, ConsultaStatus } from '../entities/Consulta'

const consultaRepository =AppDataSource.getRepository(Consulta)
const medicoRepository =AppDataSource.getRepository(Medico)
const pacienteRepository =AppDataSource.getRepository(Paciente)

export class ConsultaController{

    async agendar(req: Request, res: Response){
         const { medicoID, dataHora, observacoes } = req.body

         if (!medicoID || !dataHora){
            return res.status(400).json({erro: 'medicoID e dataHora são obrigatórios'})
         }

         const paciente = await pacienteRepository.findOne({
            where: { usuario: { id: req.usuario?.sub}}
         })

         if(!paciente){
            return res.status(404).json({erro: 'Paciente não encontrado.'})
         }

         const medico = await medicoRepository.findOneBy({ id: medicoID })

         if(!medico){
            return res.status(404).json({erro: 'Medico não encontrado.'})
         }

         const consulta = consultaRepository.create({
            paciente,
            medico,
            dataHora: new Date(dataHora),
            observacoes,
            status: ConsultaStatus.AGENDADA
         })
         await consultaRepository.save(consulta)

         return res.status(201).json(consulta)
    }
}
