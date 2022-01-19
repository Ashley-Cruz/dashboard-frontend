import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clientsLoaded } from '../../actions/client'
import { SocketContext } from './../../context/SocketContext';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export const DashboardScreen = () => {

    const dispatch = useDispatch();
    const {clients} = useSelector(state => state.client)
    const {users} = useSelector(state => state.user)

    const clientsCompleted = clients.filter( client => client.status === 'COMPLETADO');
    const clientsInProgress = clients.filter( client => client.status === 'EN PROCESO');
    const clientsPending = clients.filter( client => client.status === 'PENDIENTE');
    
    const cardsTypes = clients.reduce((acum, item) => {
        if(!acum.includes(item.card.type)){
            acum.push(item.card.type);
        }
        return acum;
    }, []);
    let dataDoughnutLn = [];
    cardsTypes.forEach((cardType, i) => {
        dataDoughnutLn[i] = clients.filter( client => client.card?.type === cardType).length;
    })

    let arrayClients = [];

    const dataFinal = users.map((user, i) => {
        arrayClients[i] = clients.filter( client => client.analyst === user.uid);
    })

    let completed = [];
    let inProgress = [];
    let pending = [];
    const ot = arrayClients.forEach( (arrClient, i) => {
        completed[i] = arrClient.filter(client => client.status === 'COMPLETADO').length;
        inProgress[i] = arrClient.filter(client => client.status === 'EN PROCESO').length;
        pending[i] = arrClient.filter(client => client.status === 'PENDIENTE').length;
    })

    const dataDoughnut = {
        labels: cardsTypes,
        datasets: [
            {
                label: 'Tipo de tarjeta',
                data: dataDoughnutLn,
                borderWidth: 2,
                backgroundColor: [
                    '#FECCA4',
                    '#FCA496',
                    '#E7A3C0',
                    '#CB9EF0',
                    '#AEA5F5',
                    '#95BEF6'
                ],
                borderColor: [
                    '#FDAB68',
                    '#FA6851',
                    '#D86697',
                    '#A85EE6',
                    '#786AEF',
                    '#4F93F1'
                ]
            },
        ],
    };

    const dataBar = {
        labels: users.map(user => user.name),
        datasets: [
            {
                label: 'COMPLETADOS',
                data: completed,
                backgroundColor: '#00b34263',
                borderColor: '#00b341',
                borderWidth: 2,
                stack: 1
            },
            {
                label: 'EN PROCESO',
                data: inProgress,
                backgroundColor: "#ffee003a",
                borderColor: '#ffec00',
                borderWidth: 2,
                stack: 1
            },
            {
                label: 'PENDIENTES',
                data: pending,
                backgroundColor: "#ff292569",
                borderColor: '#ff2825',
                borderWidth: 2,
                stack: 1
            }
        ],
    };

    return (
        <div className='card__background'>
            <div className='card__top'>
                <h2>Dashboard</h2>
            </div>
            <span></span>
            <div className='dashboard__body'>
                <div className='dashboard__general-container-info'>
                    <div className='dashboard__container-info'>
                        <p>Clientes TOTALES</p>
                        <p>{clients.length}</p>
                        <div className='dashboard__container-svg-one'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#3363Ff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <circle cx="12" cy="7" r="4" />
                                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                        </div>
                    </div>
                    <div className='dashboard__container-info'>
                        <p>Clientes COMPLETADOS</p>
                        <p>{clientsCompleted.length}</p>
                        <div className='dashboard__container-svg-two'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-check" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#00b341" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <circle cx="9" cy="7" r="4" />
                                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                <path d="M16 11l2 2l4 -4" />
                            </svg>
                        </div>
                    </div>
                    <div className='dashboard__container-info'>
                        <p>Clientes EN PROCESO</p>
                        <p>{clientsInProgress.length}</p>
                        <div className='dashboard__container-svg-three'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-minus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffec00" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <circle cx="9" cy="7" r="4" />
                                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                <line x1="16" y1="11" x2="22" y2="11" />
                            </svg>
                        </div>
                    </div>
                    <div className='dashboard__container-info'>
                        <p>Clientes PENDIENTES</p>
                        <p>{clientsPending.length}</p>
                        <div className='dashboard__container-svg-four'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff2825" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <circle cx="9" cy="7" r="4" />
                                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                <path d="M17 9l4 4m0 -4l-4 4" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='dashboard__general-conatiner-graph'>
                    <div className='dashboard__conatiner-graph'>
                        <p>Clientes por tipo de tarjeta</p>
                        <Doughnut 
                            data={dataDoughnut}
                        />
                    </div>
                    <div className='dashboard__conatiner-graph dashboard__conatiner-graph-bar'>
                        <p>Estatus de los clientes por analista</p>
                        <Bar 
                            data={dataBar}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
