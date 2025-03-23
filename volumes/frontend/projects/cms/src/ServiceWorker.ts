export const registerWorker = () => {
    if ('serviceWorker' in navigator) {

        window.addEventListener('load', () => {
            navigator.serviceWorker.register(
                '/miner_report.sw.js',
                // {
                //     scope: '/workbook/miner-reports/',
                //     // type: 'module'
                // }
            )
                .then(registration => {
                    console.log('Service Worker registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('Service Worker registration failed: ', registrationError);
                });
        });
    }
}

export function unregisterWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}