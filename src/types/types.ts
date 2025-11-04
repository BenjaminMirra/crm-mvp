interface Ingreso {
    id: string;
    cliente: string;
    descripcion: string;
    monto: number;
    fecha: string;
    horasInvertidas: number;
}

interface Gasto {
    id: string;
    categoria: 'Impuestos' | 'Software' | 'Comida' | 'Servicios' | 'Otro';
    descripcion: string;
    monto: number;
    fecha: string;
}

interface KpiCardProps {
    titulo: string;
    valor: number;
    color?: string;
    tipo_valor?: "monto" | "unidad";
}

interface ChartCardProps {
    title: string;
    children: React.ReactNode;
}

interface KpiContainerProps {
    ingresos: Ingreso[];
    gastos: Gasto[];
    marginTop?: boolean;
}

interface ChartContainerProps {
    ingresos: Ingreso[];
    gastos: Gasto[];
}

interface FiltersChipsProps {
    selectedAnios: string[];
    selectedMeses: string[];
    ingresos: Ingreso[];
    gastos: Gasto[];
    onClearAnios: () => void;
    onClearMeses: () => void;
}

export type { ChartCardProps, ChartContainerProps, FiltersChipsProps, Gasto, Ingreso, KpiCardProps, KpiContainerProps }