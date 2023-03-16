import { createContext, useState } from "react";

interface Props {
    children: React.ReactNode
}

interface Metrics {
    distance: string;
    temperature: string;
}

interface ValueProps {
    metrics: Metrics | null
    setMetrics: React.Dispatch<React.SetStateAction<Metrics>>;
}

const MetricsContext = createContext<ValueProps | null>(null);

export function MetricsProvider({ children }: Props) {

    const [ metrics, setMetrics] = useState({
        distance: "km",
        temperature: "c"
    });
   
    return (
        <MetricsContext.Provider value={{metrics, setMetrics} }>
            {children}
        </MetricsContext.Provider>
    )
}

export default MetricsContext;