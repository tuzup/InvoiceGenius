import { useRoutes } from 'react-router-dom';
import DashboardLayout from './layout/dashboard';
import QuoteGenerator from './components/QuoteGenerator';

export default function Router() {
    return useRoutes([
        {
            path: '',
            element: <DashboardLayout />,
            children: [
                {
                    path: '/quote' , 
                    element: <QuoteGenerator/>
                }
            ]
        }
    ])

}

