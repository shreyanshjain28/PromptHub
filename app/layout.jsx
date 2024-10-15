import "@styles/globals.css";

import Provider from '@components/Provider'
import Nav from '@components/Nav'

export const metadata = {
    title: "Promptop Hub",
    description: "Discover & Share AI Prompts",
};

//Components used here are displayed on all the pages. Allow us to used Comp eg Nav

const Rootlayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
             <Provider>
                <div className='main'>
                    <div className='gradient' />
                </div>

                <main className='app'>
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default Rootlayout