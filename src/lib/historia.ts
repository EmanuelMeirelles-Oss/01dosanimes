import historiaData from '../data/historia.json';

export interface EventoHistoria {
  id: string;
  mes: number;
  dia: number;
  ano: number;
  titulo: string;
  descricao: string;
  categoria: string;
  imagem: string;
}

export function getEventosHoje(): EventoHistoria[] {
  const hoje = new Date();
  const diaAtual = hoje.getDate();
  const mesAtual = hoje.getMonth() + 1; // 0-indexed in JS

  return (historiaData as EventoHistoria[]).filter((evento: EventoHistoria) => 
    evento.dia === diaAtual && evento.mes === mesAtual
  );
}

export function getEventosProximosDias(dias: number = 7): EventoHistoria[] {
  const hoje = new Date();
  hoje.setHours(0,0,0,0);
  
  const proximosEventos = (historiaData as EventoHistoria[]).filter((evento: EventoHistoria) => {
    const dataEvento = new Date(hoje.getFullYear(), evento.mes - 1, evento.dia);
    
    if (dataEvento < hoje) {
      dataEvento.setFullYear(hoje.getFullYear() + 1);
    }
    
    const diffTime = dataEvento.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    return diffDays > 0 && diffDays <= dias;
  });

  return proximosEventos.sort((a: EventoHistoria, b: EventoHistoria) => {
    const dataA = new Date(hoje.getFullYear(), a.mes - 1, a.dia);
    if (dataA < hoje) dataA.setFullYear(hoje.getFullYear() + 1);
    const dataB = new Date(hoje.getFullYear(), b.mes - 1, b.dia);
    if (dataB < hoje) dataB.setFullYear(hoje.getFullYear() + 1);
    return dataA.getTime() - dataB.getTime();
  });
}
