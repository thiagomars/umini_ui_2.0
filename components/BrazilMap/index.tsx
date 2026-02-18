'use client'

import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

const BrazilMap = () => {
    const [mapData, setMapData] = useState(false);

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
            trigger: 'item',
            showDelay: 0,
            transitionDuration: 0.2,
            // Aqui você personaliza o Popover (Tooltip)
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
                aspectScale: 1.0,
                layoutCenter: ['50%', '50%'],
                layoutSize: '100%',
                emphasis: {
                    label: { show: true },
                    itemStyle: { areaColor: '#DE7E00' }
                },
                data: [
                    { name: 'São Paulo', value: 95 },
                    { name: 'Ceará', value: 80 },
                ]
            }
        ]
    });

    if (!mapData) return <div>Carregando mapa...</div>;

    return (
        <ReactECharts
            option={getOption()}
            style={{ height: '50vw', maxHeight: '80vh', width: '100%' }}
        // onEvents={{
        //     'click': (params: any) => console.log('Estado clicado:', params.name)
        // }}
        />
    );
};

export default BrazilMap;