import './globals.css'; import type {Metadata} from 'next';
export const metadata:Metadata={title:'MediCore | Hospital Operations',description:'Synthetic-data hospital operations learning platform'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
