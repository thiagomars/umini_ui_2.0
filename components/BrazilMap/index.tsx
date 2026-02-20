'use client';

import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useIsMobile } from '@/hooks/useIsMobile';
import BoxView from '../boxView';
import BoxOpaco from '../BoxOpaco';
import { cn } from '@/lib/utils';

const BrazilMap = () => {
    const mobile = useIsMobile();

    const [mapData, setMapData] = useState(false);
    const [item, setItem] = useState<string>("");
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
        // title: {
        //     text: 'Mapa Interativo do Brasil',
        //     left: 'center'
        // },
        tooltip: {
            trigger: mobile ? 'none' : 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: (params: any) => {
                const { name, value } = params;

                return `
                <div style="padding: 8px;">
                    <b style="font-size: 16px; color: #DE7E00;">${name}</b>
                    <br/>
                    20 projetos fotovoltaicos
                    <br/>
                    2 projetos elétricos
                    <br/>
                    R$ 14.000,00 economizados com Gestão Energética
                    <br/>
                    <br/>
                    7.000 kW homologados
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
        // visualMap: {
        //     left: 'right',
        //     min: 0,
        //     max: 100,
        //     inRange: {
        //         color: ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
        //     },
        //     text: ['Alto', 'Baixo'],
        //     calculable: true
        // },
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
                    { name: 'São Paulo', value: 95 },
                    { name: 'Ceará', value: 80 },
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

                            setItem(params.name)
                        }
                    }}
                />

                <p className="z-10 w-1/2 absolute bottom-2 right-0 text-right text-xs">Dados atualizado em 19/02/2026</p>
            </div>

            <div className={cn(
                "transition-all duration-500 ease-in-out overflow-hidden",
                (!!mobile && !!viewBox)
                    ? "opacity-100 max-h-[500px]"
                    : "opacity-0 max-h-0 pointer-events-none"
            )}>
                <div className='text-sm overflow-hidden mt-4 bg-gray-50 p-4 rounded-xl shadow-md'>
                    <p><b>{item}</b></p>
                    <p>20 projetos fotovoltaicos</p>
                    <p>2 projetos elétricos</p>
                    <p>R$ 14.000,00 economizados com Gestão Energética</p>
                    <p>7.000 kW homologados</p>
                </div>
            </div>
        </div>
    )
};

export default BrazilMap;