import "./globals.css";
import {Toaster} from 'react-hot-toast';

export const metadata = {
  title: "PassNeko",
  description: "Created by Pc",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body
    suppressHydrationWarning={true}
        className={`antialiased `}>
        {children}
        
    <Toaster
    position="top-center" reverseOrder={false}/>
    </body>
    </html>
  );
}
