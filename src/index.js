import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import 'nprogress/nprogress.css';
import App from 'src/App';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import * as serviceWorker from 'src/serviceWorker';
import { AuthProvider } from 'src/contexts/AuthContext';
import { ApiProvider } from './contexts/ApiContext';
import { ConnectionProvider } from 'src/contexts/ConnectionContext';
// import { RestProvider } from './contexts/RestContext';

ReactDOM.render(
    <HelmetProvider>
        <SidebarProvider>
            <BrowserRouter>
                <ConnectionProvider>
                    <AuthProvider>
                        {/* <RestProvider> */}
                        <ApiProvider>
                            <App />
                        </ApiProvider>
                        {/* </RestProvider> */}
                    </AuthProvider>
                </ConnectionProvider>
            </BrowserRouter>
        </SidebarProvider>
    </HelmetProvider>,
    document.getElementById('root')
);

serviceWorker.register();
