'use client';

import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useIsMobile } from '@/hooks/useIsMobile';
import { cn } from '@/lib/utils';

const BrazilMap = () => {
    const mobile = useIsMobile();

    const [mapData, setMapData] = useState(false);
    const [item, setItem] = useState<any>();
    const [viewBox, setViewBox] = useState<boolean>(false);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson')
            .then(res => res.json())
            .then(geoJson => {
                echarts.registerMap('Brasil', geoJson);
                setMapData(true);
            });
    }, []);

    const getOption = () => ({
        tooltip: {
            trigger: mobile ? 'none' : 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: (params: any) => {
                const { name, data } = params;
                const { qtdFotovoltaico, qtdEletrico, economizados, homologados } = data;

                return `
                    <div style="padding: 8px;">
                        <b style="font-size: 16px; color: #DE7E00;">${name}</b>
                        <br/>
                        ${qtdFotovoltaico} projetos fotovoltaicos
                        <br/>
                        ${qtdEletrico} projetos elétricos
                        <br/>
                        R$ ${economizados?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} economizados com Gestão Energética
                        <br/>
                        <br/>
                        ${homologados?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kW homologados
                    </div>
                `;
            },
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: '#ccc',
            padding: [5, 10],
            textStyle: { color: '#000' }
        },
        series: [
            {
                name: 'Dados do Estado',
                type: 'map',
                map: 'Brasil',
                roam: mobile,
                aspectScale: 1.0,
                layoutCenter: ['50%', '50%'],
                layoutSize: '100%',
                backgroundColor: '#DE7E00',
                emphasis: {
                    label: { show: true },
                    itemStyle: { areaColor: '#DE7E00' }
                },
                data: [
                    { name: "Acre", qtdFotovoltaico: 7, qtdEletrico: 1, economizados: 767.06, homologados: 42.82 },
                    { name: "Alagoas", qtdFotovoltaico: 33, qtdEletrico: 3, economizados: 3883.59, homologados: 255.78 },
                    { name: "Amapá", qtdFotovoltaico: 53, qtdEletrico: 2, economizados: 5757.63, homologados: 347.12 },
                    { name: "Amazonas", qtdFotovoltaico: 13, qtdEletrico: 1, economizados: 1525.58, homologados: 91.12 },
                    { name: "Bahia", qtdFotovoltaico: 131, qtdEletrico: 5, economizados: 13185.31, homologados: 804.03 },
                    { name: "Ceará", qtdFotovoltaico: 350, qtdEletrico: 23, economizados: 40716.90, homologados: 2648.85 },
                    { name: "Distrito Federal", qtdFotovoltaico: 122, qtdEletrico: 4, economizados: 12525.19, homologados: 759.28 },
                    { name: "Espirito Santo", qtdFotovoltaico: 71, qtdEletrico: 3, economizados: 6715.66, homologados: 460.84 },
                    { name: "Goiás", qtdFotovoltaico: 113, qtdEletrico: 4, economizados: 13802.34, homologados: 717.57 },
                    { name: "Maranhão", qtdFotovoltaico: 70, qtdEletrico: 3, economizados: 7219.04, homologados: 547.45 },
                    { name: "Mato Grosso do Sul", qtdFotovoltaico: 198, qtdEletrico: 5, economizados: 20970.38, homologados: 1304.86 },
                    { name: "Mato Grosso", qtdFotovoltaico: 72, qtdEletrico: 5, economizados: 7665.93, homologados: 458.08 },
                    { name: "Minas Gerais", qtdFotovoltaico: 78, qtdEletrico: 4, economizados: 8803.31, homologados: 496.40 },
                    { name: "Pará", qtdFotovoltaico: 73, qtdEletrico: 5, economizados: 8554.22, homologados: 572.92 },
                    { name: "Paraíba", qtdFotovoltaico: 45, qtdEletrico: 3, economizados: 5099.78, homologados: 324.22 },
                    { name: "Paraná", qtdFotovoltaico: 112, qtdEletrico: 6, economizados: 11510.87, homologados: 778.41 },
                    { name: "Pernambuco", qtdFotovoltaico: 29, qtdEletrico: 2, economizados: 2796.08, homologados: 182.01 },
                    { name: "Piauí", qtdFotovoltaico: 145, qtdEletrico: 7, economizados: 15649.84, homologados: 1096.03 },
                    { name: "Rio de Janeiro", qtdFotovoltaico: 219, qtdEletrico: 6, economizados: 26604.13, homologados: 1686.24 },
                    { name: "Rio Grande do Norte", qtdFotovoltaico: 44, qtdEletrico: 4, economizados: 4801.15, homologados: 297.27 },
                    { name: "Rio Grande do Sul", qtdFotovoltaico: 18, qtdEletrico: 2, economizados: 2039.24, homologados: 106.25 },
                    { name: "Rondônia", qtdFotovoltaico: 6, qtdEletrico: 1, economizados: 694.80, homologados: 46.46 },
                    { name: "Roraima", qtdFotovoltaico: 177, qtdEletrico: 8, economizados: 18286.89, homologados: 1070.59 },
                    { name: "Santa Catarina", qtdFotovoltaico: 136, qtdEletrico: 4, economizados: 15073.95, homologados: 1029.07 },
                    { name: "São Paulo", qtdFotovoltaico: 15, qtdEletrico: 2, economizados: 1403.07, homologados: 115.16 },
                    { name: "Sergipe", qtdFotovoltaico: 282, qtdEletrico: 6, economizados: 27081.68, homologados: 2140.00 },
                    { name: "Tocantins", qtdFotovoltaico: 14, qtdEletrico: 1, economizados: 1306.78, homologados: 94.87 }
                ],
            }
        ]
    });

    if (!mapData) return <div>...</div>;

    return (
        <div>
            <div className='relative'>
                <ReactECharts
                    option={getOption()}
                    style={{ height: mobile ? '50vh' : '50vw', maxHeight: '80vh', width: '100%' }}
                    onEvents={{
                        'click': (params: any) => {
                            if (item == params.name && viewBox)
                                setViewBox(false)
                            else
                                setViewBox(true)

                            setItem(params.data)
                        }
                    }}
                />

                <p className="z-10 w-1/2 absolute bottom-2 right-0 text-right text-xs">Dados atualizados em 19/02/2026</p>
            </div>

            <div className={cn(
                "transition-all duration-500 ease-in-out overflow-hidden rounded-xl border mt-4",
                (!!mobile && !!viewBox)
                    ? "opacity-100 max-h-125"
                    : "opacity-0 max-h-0 pointer-events-none"
            )}>
                <div className='text-sm overflow-hidden bg-gray-50 p-4 rounded-xl shadow-md'>
                    <p className='font-bold text-primary text-base mb-2'>{item?.name}</p>
                    <div className='space-y-1'>
                        <p>{item?.qtdFotovoltaico} projetos fotovoltaicos</p>
                        <p>{item?.qtdEletrico} projetos elétricos</p>
                        <p>R$ {item?.economizados?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} economizados com Gestão Energética</p>
                        <p>{item?.homologados?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kW homologados</p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BrazilMap;