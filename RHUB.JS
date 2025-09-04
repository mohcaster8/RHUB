document.addEventListener('DOMContentLoaded', () => {
    // Data for all pages and content sections of the site
    const siteData = {
        'home': {
            title: 'Welcome to the Resource Hub',
            content: `
               <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 class="text-2xl font-bold mb-4 text-primary">DIGITAL LTC SPAIN</h2>
                        <div class="w-full aspect-video rounded-lg overflow-hidden border border-primary">
                            <iframe 
                                src="https://docs.google.com/presentation/d/1zoMSEMddI1aF5essCyd7CPfR1tAdmb_e2BWmvRD0CxA/embed?start=false&loop=false&delayms=3000" 
                                frameborder="0" 
                                width="960" 
                                height="569" 
                                allowfullscreen="true" 
                                mozallowfullscreen="true" 
                                webkitallowfullscreen="true"
                                class="w-full h-full">
                            </iframe>
                        </div>
                    </div>
                    <div class="text-center md:text-left">
                         <h2 class="text-2xl font-bold mb-4 text-primary">Welcome,</h2>
                        <p class="text-lg mb-6 text-secondary">This hub centralizes all the necessary documents, links, and information for the CC-LOG-ZES. Use the navigation on the left to find what you need.</p>
                        <div class="p-4 bg-info border border-accent rounded-lg">
                            <p class="text-info">This site was generated from the Google Sheet to provide a more user-friendly experience. All the original information is available here in an organized format.</p>
                        </div>
                    </div>
                </div>
            `
        },
        'key-links': {
            title: 'Key Links & Tools',
            type: 'links',
            content: [
                { 
                    name: 'TWIST',
                    type: 'dropdown',
                    links: [
                        { name: 'Spain', url: 'https://twist-vc-es.dktapp.cloud/twist-parcel-web/index.jsp' },
                        { name: 'Italy', url: 'https://twist-vc-it.dktapp.cloud/twist-parcel-web/index.jsp' },
                        { name: 'Romania', url: 'https://twist-vc-hu.dktapp.cloud/twist-parcel-web/index.jsp#NgPlatformPresenter' },
                        { name: 'Turkey', url: 'https://twist-vc-il.dktapp.cloud/twist-parcel-web/index.jsp#NgPlatformPresenter' },
                        { name: 'Israel', url: 'https://twist-vc-il.dktapp.cloud/twist-parcel-web/index.jsp#NgPlatformPresenter' },
                        { name: 'Chile', url: 'https://twist-vc-cl.dktapp.cloud/twist-visu-web/index.jsp#WelcomePresenter' },
                        { name: 'Mexico', url: 'https://twist-vc-mx.dktapp.cloud/twist-parcel-web/index.jsp' },
                        { name: 'Colombia', url: 'https://twist-vc-co.dktapp.cloud/twist-visu-web/index.jsp#WelcomePresenter' },
                        { name: 'Egypt', url: 'https://twist-vc-na.dktapp.cloud/twist-visu-web/index.jsp#WelcomePresenter' },
                        { name: 'France', url: 'https://twist-vc-fr.dktapp.cloud/twist-visu-web/index.jsp#WelcomePresenter' },
                        { name: 'Germany', url: 'https://twist-vc-de.dktapp.cloud/twist-visu-web/index.jsp#WelcomePresenter' },
                        { name: 'Poland', url: 'https://twist-vc-pl.dktapp.cloud/twist-visu-web/index.jsp#WelcomePresenter' },
                        { name: 'United Kingdom', url: 'https://twist-vc-uk.dktapp.cloud/twist-visu-web/index.jsp#WelcomePresenter' },
                        { name: 'Canada', url: 'https://twist-vc-am.dktapp.cloud/twist-visu-web/index.jsp#WelcomePresenter' },
                        { name: 'Netherlands', url: 'https://twist-vc-nl.dktapp.cloud/twist-visu-web/index.jsp#WelcomePresenter' },
                        { name: 'Malaysia', url: 'https://twist-vc-my.dktapp.cloud/twist-visu-web/index.jsp#WelcomePresenter' },
                        { name: 'Thailand / Philippines / New Zealand', url: 'https://twist-vc-as.dktapp.cloud/twist-visu-web/index.jsp#WelcomePresenter' }
                    ]
                },
                { 
                    name: 'MANHATTAN',
                    type: 'dropdown',
                    links: [
                        { name: 'MANHATTAN', url: 'https://udcl.manhscale.com/scale/trans/dashboard' },
                        { name: 'DASHBOARD', url: 'https://udclsci.manhscale.com/bi/?CAMNamespace=udcl' }
                    ]
                },
                { name: 'SHIPPERBOX', url: 'https://shipper-front-vctech.dktapp.cloud/home?code=OCtoIYIALjtzKVGV07V8X9XI9f7OTZnfxFwAAALC&state=7fa334d19c344912b27a352edd70201e' },
                { 
                    name: 'WAREHOUSEBOX',
                    type: 'dropdown',
                    links: [
                        { name: 'PICKINGWAVEBOX', url: 'https://whbox-pickingwavebox-eu.dktapp.cloud/3020913078276/?date=2024-05-15&page=1&size=15' },
                        { name: 'USERBOX', url: 'https://whbox-userbox.dktapp.cloud/search' },
                        { name: 'SHIPIT', url: 'https://shipit-eu.dktapp.cloud/' }
                    ]
                },
                 { 
                    name: 'GEEK+',
                    type: 'dropdown',
                    links: [
                        { name: 'Italia - Campania', url: 'http://172.21.83.2/static/html/login.html?r=http%3A%2F%2F172.21.83.2%2Fstatic%2Fhtml%2Fadmin%2Finventory%2FallowanceSearch.html%23currentPage%3D1', note: 'Login: 123456' },
                        { name: 'Barcelona', url: 'http://172.21.83.2/static/html/login.html?r=http%3A%2F%2F172.21.83.2%2Fstatic%2Fhtml%2Fadmin%2Finventory%2FallowanceSearch.html%23currentPage%3D1', note: 'Login: 123456' },
                        { name: 'Israel', url: 'http://172.21.90.2/static/html/login.html', note: 'Login: admin / 111111' }
                    ]
                },
                { 
                    name: 'EXOTEC PF',
                    type: 'dropdown',
                    note: 'Login: CC_LOG_ZES / ECOM_2024',
                    links: [
                        { name: 'App ControlTower', url: 'https://exotracker.exotec.com/' },
                    ]
                },
                { 
                    name: 'SQUARE',
                    type: 'dropdown',
                    links: [
                        { name: 'Spain', url: 'https://crc.square.decathlon.net/es/' },
                        { name: 'Italy', url: 'https://crc.square.decathlon.net/it/' },
                        { name: 'Portugal', url: 'https://app.square.decathlon.net/pt' },
                        { name: 'Romania', url: 'https://app.square.decathlon.net/ro' },
                        { name: 'Turkey', url: 'https://app.square.decathlon.net/tr' },
                        { name: 'CRC', url: 'https://crc.square.decathlon.net/' }
                    ]
                },
                { 
                    name: 'DCMR',
                    type: 'dropdown',
                    links: [
                        { name: 'Drive', url: 'https://dcmr-driver.spain.decathlon.net/' },
                        { name: 'User', url: 'https://dcmr.spain.decathlon.net/collaborator' }
                    ]
                },
                { 
                    name: 'CUPS',
                    type: 'dropdown',
                    links: [
                        { name: 'Spain', url: 'https://twist-cups-v2-es.dktapp.cloud/' },
                        { name: 'Italy', url: 'https://twist-cups-v2-it.dktapp.cloud/' },
                        { name: 'Romania', url: 'https://twist-cups-v2-hu.dktapp.cloud/' },
                        { name: 'Turkey', url: 'https://twist-cups-v2-tr.dktapp.cloud/' },
                        { name: 'Israel', url: 'https://twist-cups-v2-il.dktapp.cloud/' },
                        { name: 'Chile', url: 'https://twist-cups-v2-cl.dktapp.cloud/' },
                        { name: 'Mexico', url: 'https://twist-cups-v2-mx.dktapp.cloud/' },
                        { name: 'Colombia', url: 'https://twist-cups-v2-co.dktapp.cloud/' },
                        { name: 'Brooklyn', url: 'https://brooklyn-cups.dktapp.cloud/admin' }
                    ]
                },
                { 
                    name: 'TRANSPORT',
                    type: 'dropdown',
                    links: [
                        { name: 'Cape', url: 'https://cape.dktapp.cloud/capetm/index.jsp' },
                        { name: 'Next', url: 'https://next.dktapp.cloud/next-cfm/index.jsp' },
                        { name: 'Tattoo', url: 'https://tattoo.dktapp.cloud/tattoo/index.jsp' }
                    ]
                },
                 { 
                    name: 'PROFILES',
                    type: 'dropdown',
                    links: [
                        { name: 'Identity Access', url: 'https://identity-access.decathlon.net/identityiq/home.jsf' },
                        { name: 'MYGOOGLE', url: 'https://mygoogle.decathlon.net/' },
                        { name: 'HDA', url: 'https://hda.spain.decathlon.net/' },
                        { name: 'EPlanning', url: 'https://eplanningplus.decathlon.net/map' },
                        { name: 'Distributions list', url: 'https://list-iam.dktapp.cloud/' },
                        { name: 'New groups', url: 'https://mygooglev2.decathlon.net/' }
                    ]
                },
                { 
                    name: 'DEVICES',
                    type: 'dropdown',
                    links: [
                        { name: 'Soti Mobicontrol', url: 'https://s095102.mobicontrolcloud.com/MobiControl/WebConsole' },
                        { name: 'Meraki Dash', url: 'https://idpdecathlon.oxylane.com/idp/startSSO.ping?PartnerSpId=meraki-local-access' },
                        { name: 'Meraki MX', url: 'https://idpdecathlon.oxylane.com/idp/startSSO.ping?PartnerSpId=https%3A%2F%2Fdashboard.meraki.com' },
                        { name: 'WS1', url: 'https://decathlon.awmdm.com/AirWatch/Login?ReturnUrl=%2FAirWatch%2F#/Device/Dashboard' },
                        { name: 'SMax', url: 'https://support.decathlon.net/saw/Requests?filterRepoName=filter-497986067&filterRepoNamespace=filterRepoAd-hoc' }
                    ]
                },
                { 
                    name: 'PAGER',
                    type: 'dropdown',
                    links: [
                        { name: 'Pagerduty', url: 'https://decathlon.pagerduty.com/?signed_up=false', note: 'Login: cc-log-zes@decathlon.net / Decathlon01.' },
                        { name: 'Perimetro no-as400', url: 'https://docs.google.com/forms/d/e/1FAIpQLSfPu4s7ifmYRI_c0h2vxgZe3S6gr1V5DjOLtohGEQ4LkbRMCw/viewform', note: 'For NO-AS400 perimeters (wbox, shipit, twist)' },
                        { name: 'Planilla duty', url: 'https://docs.google.com/document/d/1Z3TE5cabfoKzLGtqC33_W5tcKH6l55I9JSCnRz6yp1M/edit?tab=t.0' },
                        { name: 'Historico Dutys', url: 'https://forms.gle/GVNb4YKNbcuWQ23N6' }
                    ]
                },
                { name: 'RETBOX', url: 'https://retbox.dktapp.cloud/' },
                { name: 'MASTERDATA', url: 'https://masterdatas-admin.dktapp.cloud/' },
                { name: 'BROOKLYN', url: 'https://brooklyn.dktapp.cloud/' },
                { name: 'Central Control Sheets', url: 'https://docs.google.com/spreadsheets/d/1hrWOhidd0ZhKl3OOLfh5Au_TZg8pXSqdiADOyzQB6iQ/edit?gid=1002240399#gid=1002240399' },
            ],
        },
        'perimeter': {
            title: 'Perimeter Zone',
            type: 'tabs',
            content: {
                zes: [
                    { COUNTRY: 'Spain', 'DC - EDC': 'DC', WAREHOUSE: 'Barcelona', 'AS400 MACHINE': 'ESDKL02', L: 'L26', 'SAP NUMBER': 'W025', QUAI: 'QUAI05-106', 'PHONE NUMBER': '(+34) 937 79 88 30', 'TICKET DISCUSSION': 'DC Barcelona (ESDKL02 - W025)', HORARIOS: '', 'Numero Eplanning': '860' },
                    { COUNTRY: 'Spain', 'DC - EDC': 'PF @', WAREHOUSE: 'Barcelona', 'AS400 MACHINE': '', L: '', 'SAP NUMBER': '', QUAI: '', 'PHONE NUMBER': '(+34) 937 79 88 30', 'TICKET DISCUSSION': 'PF @ Barcelona (3002)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Spain', 'DC - EDC': 'DC', WAREHOUSE: 'Getafe / Gavilanes', 'AS400 MACHINE': 'ESDKL04', L: 'L35', 'SAP NUMBER': 'W005', QUAI: 'QUAI230', 'PHONE NUMBER': '(+34) 916 91 83 60', 'TICKET DISCUSSION': 'DC Getafe (ESDKL04 - W035)', HORARIOS: '', 'Numero Eplanning': '861' },
                    { COUNTRY: 'Spain', 'DC - EDC': 'DC', WAREHOUSE: 'Getafe / CLA', 'AS400 MACHINE': 'ESDKL04', L: 'L35', 'SAP NUMBER': 'W005', QUAI: 'QUAI345', 'PHONE NUMBER': '(+34) 916 91 84 07', 'TICKET DISCUSSION': '', HORARIOS: '', 'Numero Eplanning': '878' },
                    { COUNTRY: 'Spain', 'DC - EDC': 'EDC - Specific', WAREHOUSE: 'Getafe // Specific Spain', 'AS400 MACHINE': 'ESDKL10.NEWGES68', L: 'L68', 'SAP NUMBER': 'W004', QUAI: 'QUAI254', 'PHONE NUMBER': '(+34) 916 91 83 60', 'TICKET DISCUSSION': 'EDC - Specific Madrid Sur CLA (ESDKL10.NEWGES68 - W034)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Spain', 'DC - EDC': 'DC', WAREHOUSE: 'Barcelona / El Prat', 'AS400 MACHINE': 'ESDKL06', L: 'L56', 'SAP NUMBER': 'W056', QUAI: 'QUAI273-276', 'PHONE NUMBER': '(+34) 916 91 83 60', 'TICKET DISCUSSION': 'EDC El Prat (ESDKL06 - W056)', HORARIOS: '', 'Numero Eplanning': '873' },
                    { COUNTRY: 'Spain', 'DC - EDC': 'DC', WAREHOUSE: 'Leon', 'AS400 MACHINE': 'ESDKL07', L: 'L63', 'SAP NUMBER': 'W063', QUAI: 'QUAI286', 'PHONE NUMBER': '(+34) 987 39 14 69', 'TICKET DISCUSSION': 'DC Leon (ESDKL07 - W063)', HORARIOS: '', 'Numero Eplanning': '007' },
                    { COUNTRY: 'Spain', 'DC - EDC': 'EDC', WAREHOUSE: 'Zaragoza', 'AS400 MACHINE': 'ESDKL08', L: 'L75', 'SAP NUMBER': 'W075', QUAI: 'QUAI284-285', 'PHONE NUMBER': '(+34) 876 53 34 00', 'TICKET DISCUSSION': 'EDC Zaragoza (ESDKL08 - W075)', HORARIOS: '', 'Numero Eplanning': '017' },
                    { COUNTRY: 'Spain', 'DC - EDC': 'DC', WAREHOUSE: 'Molins', 'AS400 MACHINE': 'ESDKL11', L: '?', 'SAP NUMBER': 'W189', QUAI: 'QUAI409', 'PHONE NUMBER': '', 'TICKET DISCUSSION': 'EDC Molins (ESDKL11 - W189)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Italy', 'DC - EDC': 'DC', WAREHOUSE: 'Basiano // LSS', 'AS400 MACHINE': 'ITDKL01', L: 'L07', 'SAP NUMBER': 'W043', QUAI: 'QUAI248-249', 'PHONE NUMBER': '(+39) 025 00 33 194', 'TICKET DISCUSSION': 'DC Basiano (ITDKL01 - W043)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Italy', 'DC - EDC': 'PF @', WAREHOUSE: 'Basiano', 'AS400 MACHINE': '', L: '3121', 'SAP NUMBER': '', QUAI: '', 'PHONE NUMBER': '(+39) 026 00 33 194', 'TICKET DISCUSSION': 'PF @ Basiano (3121)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Italy', 'DC - EDC': 'DC', WAREHOUSE: 'Bologna / CAST', 'AS400 MACHINE': 'ITDKL03', L: 'L51', 'SAP NUMBER': 'W051', QUAI: 'QUAI299', 'PHONE NUMBER': '(+39) 051 00 97 505', 'TICKET DISCUSSION': 'DC Bologna (CSPT) (ITDKL03 - W051)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Italy', 'DC - EDC': 'EDC - Specific', WAREHOUSE: 'Bologna // CAST', 'AS400 MACHINE': 'ITDKL05.NEWGES08', L: 'L68', 'SAP NUMBER': 'W007', QUAI: 'QUAI143', 'PHONE NUMBER': '(+39) 011 91 39 920', 'TICKET DISCUSSION': 'EDC - Specific Brandizzo (ITDKL05.NEWGES08 - W007)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Italy', 'DC - EDC': 'DC', WAREHOUSE: 'Campania // MADD', 'AS400 MACHINE': 'ITDKL04', L: 'L60', 'SAP NUMBER': 'W060', QUAI: 'QUAI280', 'PHONE NUMBER': '(+39) 082 31 65 80 14', 'TICKET DISCUSSION': 'DC Campania (ITDKL04 - W060)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Italy', 'DC - EDC': 'PF @', WAREHOUSE: 'Campania // MADD', 'AS400 MACHINE': '', L: '2707', 'SAP NUMBER': '', QUAI: '', 'PHONE NUMBER': '(+39) 082 31 65 80 14', 'TICKET DISCUSSION': 'PF @ Maddaloni (2707)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Italy', 'DC - EDC': 'BB', WAREHOUSE: 'Brendazzo', 'AS400 MACHINE': 'FEWKL05', L: 'L46', 'SAP NUMBER': 'W468', QUAI: 'QUAI624', 'PHONE NUMBER': '(+39) 010 01 39 920', 'TICKET DISCUSSION': '', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Italy', 'DC - EDC': 'DC', WAREHOUSE: 'Factory IT Rocca // ROCC', 'AS400 MACHINE': 'ITDKL06', L: 'L81', 'SAP NUMBER': 'W177', QUAI: 'QUAI393-394', 'PHONE NUMBER': '(+39) 342 10 24 927', 'TICKET DISCUSSION': 'DC Factory IT Rocca (ITDKL06 - W177)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Italy', 'DC - EDC': 'EDC', WAREHOUSE: 'Factory IT Rivalta', 'AS400 MACHINE': 'ITDKL07', L: 'L36', 'SAP NUMBER': 'W182', QUAI: 'QUAI400', 'PHONE NUMBER': '(+39) 346 58 11 608', 'TICKET DISCUSSION': 'EDC - Specific Factory IT Rivalta (ITDKL07 - W182)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Portugal', 'DC - EDC': 'DC', WAREHOUSE: 'Setubal', 'AS400 MACHINE': 'PTDKL01', L: 'L60', 'SAP NUMBER': 'W077', QUAI: 'QUAI299', 'PHONE NUMBER': '(+351) 265 72 02 30', 'TICKET DISCUSSION': 'DC Setubal (PTDKL01 - W077)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Portugal', 'DC - EDC': 'EDC - Specific', WAREHOUSE: 'Setubal', 'AS400 MACHINE': 'PTDKL01.NEWGES78', L: 'L78', 'SAP NUMBER': 'W078', QUAI: 'QUAI299', 'PHONE NUMBER': '(+351) 969 55 72 51', 'TICKET DISCUSSION': 'EDC - Specific Setubal (PTDKL01.NEWGES78 - W078)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Portugal', 'DC - EDC': 'DC', WAREHOUSE: 'Factory PT', 'AS400 MACHINE': 'PTDKL02', L: 'L74', 'SAP NUMBER': 'W174', QUAI: 'QUAI397', 'PHONE NUMBER': '(+351) 910 80 59 26', 'TICKET DISCUSSION': 'EDC Factory PT (PTDKL02 - W174)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'LATAM', 'DC - EDC': 'DC', WAREHOUSE: 'Santiago Chile', 'AS400 MACHINE': 'CLDKL01', L: 'L44', 'SAP NUMBER': 'W143', QUAI: 'QUAI350', 'PHONE NUMBER': '(+56)', 'TICKET DISCUSSION': 'DC Chile (CLDKL01 - W143)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'LATAM', 'DC - EDC': 'EDC', WAREHOUSE: 'Santiago Chile', 'AS400 MACHINE': 'CLDKL01', L: 'L44', 'SAP NUMBER': 'W142', QUAI: 'QUAI350', 'PHONE NUMBER': '', 'TICKET DISCUSSION': '', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'LATAM', 'DC - EDC': 'DC', WAREHOUSE: 'Colombia', 'AS400 MACHINE': 'CODKL01', L: 'L30', 'SAP NUMBER': 'W117', QUAI: 'W036', 'PHONE NUMBER': '(+57)', 'TICKET DISCUSSION': 'DC Colombia (CODKL01 - W117)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'LATAM', 'DC - EDC': 'EDC', WAREHOUSE: 'Booster Colombia', 'AS400 MACHINE': 'CODKL02', L: 'L29', 'SAP NUMBER': 'W107', QUAI: 'QUAI334-335', 'PHONE NUMBER': '(+57)', 'TICKET DISCUSSION': 'DC Booster Colombia (CODKL02 - W107)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'LATAM', 'DC - EDC': 'DC', WAREHOUSE: 'Mexico', 'AS400 MACHINE': 'MXDKL01', L: 'L03', 'SAP NUMBER': 'W131', QUAI: 'QUAI332', 'PHONE NUMBER': '(+52)', 'TICKET DISCUSSION': 'DC Mexico (SADKL01 / MXDKL01 - W131)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Romania', 'DC - EDC': 'DC', WAREHOUSE: 'Bucharest', 'AS400 MACHINE': 'RODKL01', L: 'L12', 'SAP NUMBER': 'W112', QUAI: 'QUAI333', 'PHONE NUMBER': '(+40) 212 084 170', 'TICKET DISCUSSION': 'DC Bucharest (RODKL01 - W112)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Romania', 'DC - EDC': 'EDC - Specific', WAREHOUSE: 'Bucharest', 'AS400 MACHINE': 'RODKL01.NEWGES82', L: 'L82', 'SAP NUMBER': 'W159', QUAI: 'QUAI360', 'PHONE NUMBER': '(+40) 212 084 170', 'TICKET DISCUSSION': 'EDC - Specific Bucharest (RODKL01.NEWGES82 - W159)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Romania', 'DC - EDC': 'EDC', WAREHOUSE: 'Factory RO', 'AS400 MACHINE': 'RODKL02', L: 'L89', 'SAP NUMBER': 'W178', QUAI: 'QUAI396', 'PHONE NUMBER': '(+40)', 'TICKET DISCUSSION': 'EDC Factory RO (RODKL02 - W178)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Türkiye', 'DC - EDC': 'DCEOC', WAREHOUSE: 'Instanbul', 'AS400 MACHINE': 'TRDKL01', L: 'L05', 'SAP NUMBER': 'W085', QUAI: 'QUAI304-305', 'PHONE NUMBER': '(+90) 505 12 00 880', 'TICKET DISCUSSION': 'DC Turkey (TRDKL01 - W085)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Israel', 'DC - EDC': 'DC', WAREHOUSE: 'Tel Aviv', 'AS400 MACHINE': 'ILDKL01', L: 'L33', 'SAP NUMBER': 'W141', QUAI: 'QUAI341', 'PHONE NUMBER': '(+972)', 'TICKET DISCUSSION': 'DC Tell Aviv (ILDKL01 - W141)', HORARIOS: '', 'Numero Eplanning': '' },
                    { COUNTRY: 'Egypt', 'DC - EDC': 'DC', WAREHOUSE: 'Egypt', 'AS400 MACHINE': 'EGDKL01', L: 'L55', 'SAP NUMBER': 'W150', QUAI: 'QUAI 351', 'PHONE NUMBER': '(+20)', 'TICKET DISCUSSION': 'DC Egypt (EGDKL01 - W150)', HORARIOS: '', 'Numero Eplanning': '' },
                ],
                zen: [
                    { COUNTRY: 'Canada/USA', WH: 'W133', AS400: 'AMDKL01', TYPE: 'CAR / CAC', NOM: 'CAR MONTREAL (Saint-Laurent)' },
                    { COUNTRY: 'Canada/USA', WH: 'W135', AS400: 'AMDKL01', TYPE: 'CAR / CAC', NOM: 'OAKLAND / USA' },
                    { COUNTRY: 'Belgium', WH: 'W054', AS400: 'BEDKL02', TYPE: 'CAR', NOM: 'CAC LILLE (Henin) (anciennement WILLEBROEK)' },
                    { COUNTRY: 'Belgium', WH: 'W113', AS400: 'BEDKL02', TYPE: 'DEVENT', NOM: 'Spécifique BENELUX' },
                    { COUNTRY: 'Brazil', WH: 'W041', AS400: 'BRDKL01', TYPE: 'CAR', NOM: 'EMBU (Brésil)' },
                    { COUNTRY: 'Ivory Coast', WH: 'W173', AS400: 'CIDKL01', TYPE: 'CAR/DC', NOM: 'CAR IVORY COAST (ABIDJAN)' },
                    { COUNTRY: 'Switzerland', WH: 'W139', AS400: 'CHDKL01', TYPE: 'CAR', NOM: 'ONNENS (Suisse)' },
                    { COUNTRY: 'Germany', WH: 'W083', AS400: 'DEDKL01', TYPE: 'CAR', NOM: 'MANNHEIM' },
                    { COUNTRY: 'Germany', WH: 'W099', AS400: 'DEDKL01', TYPE: 'Spécifique', NOM: 'Spécifique ALLEMAGNE' },
                    { COUNTRY: 'Germany', WH: 'W122', AS400: 'DEDKL02', TYPE: 'CAR', NOM: 'DORTMUND' },
                    { COUNTRY: 'Algeria', WH: 'W168', AS400: 'DZDKL01', TYPE: 'CAC', NOM: 'ALGER' },
                    { COUNTRY: 'France', WH: 'W009', AS400: 'FRDKL09', TYPE: 'CAC', NOM: 'ST MARTIN DE CRAU' },
                    { COUNTRY: 'France', WH: 'W185', AS400: 'FRDKL85', TYPE: 'BOOSTER', NOM: 'MARSEILLE (SMC)' },
                    { COUNTRY: 'France', WH: 'W011', AS400: 'FRDKL11', TYPE: 'CAR', NOM: 'LOMPRET WHLO' },
                    { COUNTRY: 'France', WH: 'W016', AS400: 'FRDKL16', TYPE: 'CAR', NOM: 'BRETIGNY BRET' },
                    { COUNTRY: 'France', WH: 'W019', AS400: 'FRDKL19 (FRDKL37 (Devent) FRDKL23 )', TYPE: 'CAR', NOM: 'SAINT QUENTIN FALLAVIER' },
                    { COUNTRY: 'France', WH: 'W020', AS400: 'Mannathan', TYPE: 'PFE', NOM: 'MONTBARTIER (=CASTELNAU)' },
                    { COUNTRY: 'France', WH: 'W023', AS400: 'FRDKL23 ( FRDKL37(devent) FRDKL19 )', TYPE: 'CAC', NOM: 'SATOLAS' },
                    { COUNTRY: 'France', WH: 'W023', AS400: 'FRDKL23', TYPE: 'CAC', NOM: 'SAT1 (Parcolog)' },
                    { COUNTRY: 'France', WH: 'W024', AS400: 'FRDKL24', TYPE: 'CAR', NOM: 'BUSY' },
                    { COUNTRY: 'France', WH: 'W027', AS400: 'FRDKL27', TYPE: 'CAR', NOM: 'SAINTE LUCE SUR LOIRE (NANTES)' },
                    { COUNTRY: 'France', WH: 'W028', AS400: 'FRDKL28', TYPE: 'CAR', NOM: 'WITTENHEIM (MULHOUSE)' },
                    { COUNTRY: 'France', WH: 'W006', AS400: 'FRDKL37', TYPE: 'CAC', NOM: 'ROUVIGNIES SAV AGENCEMENT' },
                    { COUNTRY: 'France', WH: 'W014', AS400: 'FRDKL37', TYPE: 'Composants', NOM: 'MAROC Composants Koodza' },
                    { COUNTRY: 'France', WH: 'W018', AS400: 'FRDKL37', TYPE: 'CAC', NOM: 'CHAPONNAY (INTERRALOG)' },
                    { COUNTRY: 'France', WH: 'W021', AS400: 'FRDKL37', TYPE: 'CAN', NOM: 'TANGER' },
                    { COUNTRY: 'France', WH: 'W501', AS400: 'FRDKL72', TYPE: 'CAR', NOM: 'JETLANE, AML FR USINE BTWIN MKNIX FBTO' },
                    { COUNTRY: 'France', WH: 'W126', AS400: 'FRDKL37', TYPE: 'CAC', NOM: 'CAC Afrique du sud' },
                    { COUNTRY: 'France', WH: 'W156', AS400: 'FRDKL37', TYPE: 'BOOSTER', NOM: 'BOOSTER MAURITIUS' },
                    { COUNTRY: 'France', WH: 'W053', AS400: 'FRDKL53', TYPE: 'CAR', NOM: 'CAEN (CAGNY)' },
                    { COUNTRY: 'France', WH: 'W059', AS400: 'FRDKL59', TYPE: 'CAR', NOM: 'CESTAS' },
                    { COUNTRY: 'France', WH: 'W059', AS400: 'FRDKL59', TYPE: 'CAR', NOM: 'Monbartier (débord)' },
                    { COUNTRY: 'France', WH: 'W062', AS400: 'FRDKL62', TYPE: 'CAC', NOM: 'EVIN (Camp de base)' },
                    { COUNTRY: 'France', WH: 'W062', AS400: 'FRDKL62', TYPE: 'PFE', NOM: 'PFE2 (Symastock)' },
                    { COUNTRY: 'France', WH: 'W181', AS400: 'FRDKL69', TYPE: 'CAC', NOM: 'CAC LILLE (Henin)' },
                    { COUNTRY: 'France', WH: 'W175', AS400: 'FRDKL72', TYPE: 'CAC', NOM: 'SANTES DEBORD AML SANT' },
                    { COUNTRY: 'France', WH: 'W090', AS400: 'EWM', TYPE: 'CAC', NOM: 'ROUVIGNIES' },
                    { COUNTRY: 'Hungary', WH: 'W071', AS400: 'HUDKL01', TYPE: 'CAR', NOM: 'HATVAN (Hongrie)' },
                    { COUNTRY: 'Netherlands', WH: 'W146', AS400: 'NLDKL01', TYPE: 'CAR', NOM: 'TILBURG' },
                    { COUNTRY: 'Poland', WH: 'W058', AS400: 'PLDKL01', TYPE: 'CAR', NOM: 'GLIWICE (Pologne)' },
                    { COUNTRY: 'Poland', WH: 'W061', AS400: 'PLDKL02', TYPE: 'Spécifique', NOM: 'Spécifique POLOGNE' },
                    { COUNTRY: 'Poland', WH: 'W115', AS400: 'PLDKL02', TYPE: 'CAR', NOM: 'LODZ (Prague)' },
                    { COUNTRY: 'Tunisia', WH: 'W144', AS400: 'TNDKL01', TYPE: 'CAC', NOM: 'TUNIS' },
                    { COUNTRY: 'United Kingdom', WH: 'W158', AS400: 'UKDKL01', TYPE: 'CAR', NOM: 'NORTHAMPTON' },
                    { COUNTRY: 'United Kingdom', WH: 'W098', AS400: 'UKDKL01', TYPE: 'Spécifique', NOM: 'Spécifique ROYAUME-UNI' },
                    { COUNTRY: 'France', WH: 'W002', AS400: 'ENTSUD', TYPE: 'CAR', NOM: 'Ensues' },
                    { COUNTRY: 'France', WH: '', AS400: 'FRDKL11', TYPE: 'Debord', NOM: 'Lomme LOMM' },
                    { COUNTRY: 'Morocco', WH: 'W184', AS400: 'MADKL01', TYPE: 'CAC / CAR', NOM: 'Mohammedia' }
                ]
            }
        },
         'run-log': {
            title: 'RUN LOG',
            type: 'table',
            content: [
                { "Escalation Group": "CC-ITRELAY-SEVILLA", Perimeter: "Enlaces INFO", Pagerduty: "" },
                { "Escalation Group": "CC-ITRELAY-LEON", Perimeter: "Enlaces INFO", Pagerduty: "" },
                { "Escalation Group": "CC-ITRELAY-BARCELONA", Perimeter: "Enlaces INFO", Pagerduty: "" },
                { "Escalation Group": "CC-ITRELAY-GETAFE", Perimeter: "Enlaces INFO", Pagerduty: "" },
                { "Escalation Group": "CC-ITRELAY-PFBA", Perimeter: "Enlaces INFO", Pagerduty: "" },
                { "Escalation Group": "CC-ITRELAY-MADRID-CLA", Perimeter: "Enlaces INFO", Pagerduty: "" },
                { "Escalation Group": "CC-ITRELAY-ZARAGOZA", Perimeter: "Enlaces INFO", Pagerduty: "" },
                { "Escalation Group": "CC-ITRELAY-PRAT", Perimeter: "Enlaces INFO", Pagerduty: "" },
                { "Escalation Group": "CS-ECOM-SPAIN", Perimeter: "ECOM menos MANHATTAN", Pagerduty: "" },
                { "Escalation Group": "CS-LOG-SCALE-ZES", Perimeter: "ECOM solo MANHATTAN, BROOKLYN", Pagerduty: "" },
                { "Escalation Group": "CP-LOG-MADRID", Perimeter: "RIL", Pagerduty: "" },
                { "Escalation Group": "CS-LOG-ZES-WAREHOUSE-SOFT", Perimeter: "AS400", Pagerduty: "" },
                { "Escalation Group": "CS-LOGZES_DEVOPS", Perimeter: "DEVs", Pagerduty: "" },
                { "Escalation Group": "CS-LOG-SPAIN", Perimeter: "EWM, DISPO STOCK", Pagerduty: "" },
                { "Escalation Group": "CS-LASTMILE-ZES", Perimeter: "SB - ES/TK/Pt", Pagerduty: "" },
                { "Escalation Group": "CC-ZES-RETAIL", Perimeter: "HD SANSE", Pagerduty: "Yes" },
                { "Escalation Group": "CS-ECOMMERCE-UNITED", Perimeter: "CUBE", Pagerduty: "Yes" },
                { "Escalation Group": "CS-FNR-ZES", Perimeter: "FNR", Pagerduty: "" },
                { "Escalation Group": "CS-INFRA-SPAIN", Perimeter: "", Pagerduty: "" },
                { "Escalation Group": "CS-ZES-NETWORK", Perimeter: "REDES", Pagerduty: "Yes" },
                { "Escalation Group": "CS-TELEPHONE-SPAIN", Perimeter: "TELEFONIA", Pagerduty: "" },
                { "Escalation Group": "CE-OPS-SPAIN", Perimeter: "", Pagerduty: "" },
                { "Escalation Group": "CE-ZES-LOCAL", Perimeter: "GDA", Pagerduty: "" },
                { "Escalation Group": "CE-PEOPLEIT-ZES", Perimeter: "EPLANNING", Pagerduty: "" },
                { "Escalation Group": "LU-ZES-MYDKT", Perimeter: "Descuentos", Pagerduty: "" },
                { "Escalation Group": "CC-ZAM-RETAIL", Perimeter: "HD LATAM", Pagerduty: "Yes" },
                { "Escalation Group": "CS-SAP-ECOM", Perimeter: "SAP, DISPO STOCK", Pagerduty: "Yes" },
                { "Escalation Group": "CS-SHIPPERBOX", Perimeter: "SHIPPERBOX", Pagerduty: "Yes" },
                { "Escalation Group": "CE-SHIPPERBOX-ITALY", Perimeter: "SHIPPERBOX ITALIA", Pagerduty: "" },
                { "Escalation Group": "CS-LOG-ZEN-ECOM", Perimeter: "ECOM no DUTY", Pagerduty: "" },
                { "Escalation Group": "CE-LOG-TWIST", Perimeter: "ECOM solo DUTY", Pagerduty: "Yes" },
                { "Escalation Group": "CS-LOG-SCALE", Perimeter: "MANHATTAN ZEN", Pagerduty: "Yes" },
                { "Escalation Group": "CS-RETURNS", Perimeter: "RETBOX", Pagerduty: "" },
                { "Escalation Group": "CS-POSDATA", Perimeter: "POSLOG PT", Pagerduty: "Yes" },
                { "Escalation Group": "CS-ONESHOP-EUROPE", Perimeter: "PRESTASHOP, ONESHOP... %SHOP", Pagerduty: "Yes" },
                { "Escalation Group": "CS-CHOPPER", Perimeter: "CS-ECOMMERCE-UNITED", Pagerduty: "Yes" },
                { "Escalation Group": "CS-TETRIX", Perimeter: "INIX", Pagerduty: "Yes" },
                { "Escalation Group": "CS-MASTERDATAS", Perimeter: "ARTICULOS", Pagerduty: "Yes" },
                { "Escalation Group": "CS-LOG-WAREHOUSE-HARD", Perimeter: "TME", Pagerduty: "Yes" },
                { "Escalation Group": "CS-LOG-ZEN-WAREHOUSE-SOFT", Perimeter: "AS400", Pagerduty: "" },
                { "Escalation Group": "CE-LOG-WAREHOUSE-SOFT", Perimeter: "TMA", Pagerduty: "Yes" },
                { "Escalation Group": "CS-TRANSPORT-CUSTOMS-EU", Perimeter: "CAPE", Pagerduty: "" },
                { "Escalation Group": "CS-PURCHASE-EUROPE", Perimeter: "SAP PO ", Pagerduty: "" },
                { "Escalation Group": "CS-IAM", Perimeter: "IDENTITY ACCESS", Pagerduty: "Yes" },
                { "Escalation Group": "CS-FLOW", Perimeter: "FLUJO", Pagerduty: "Yes" },
                { "Escalation Group": "CE-LOG-BI", Perimeter: "VIEW", Pagerduty: "" },
                { "Escalation Group": "CE-LOG-DUTY-NETWORK-DEVICES", Perimeter: "NETWORK DUTY (ISR, RO, TR)", Pagerduty: "Yes" },
                { "Escalation Group": "CP-CANADA", Perimeter: "NETWORK DUTY ( LATAM)", Pagerduty: "Yes" },
                { "Escalation Group": "CE-LOG-RFID-HARD", Perimeter: "EMBISPHERE", Pagerduty: "" },
                { "Escalation Group": "CP-LOG-ITALY", Perimeter: "RIL", Pagerduty: "" },
                { "Escalation Group": "CP-PORTUGAL", Perimeter: "RIL", Pagerduty: "" },
                { "Escalation Group": "CP-TURKEY", Perimeter: "RIL", Pagerduty: "" },
                { "Escalation Group": "CP-ROMANIA", Perimeter: "RIL", Pagerduty: "" },
                { "Escalation Group": "CP-ISRAEL", Perimeter: "RIL", Pagerduty: "" },
                { "Escalation Group": "CP-EGYPT", Perimeter: "RIL", Pagerduty: "" },
                { "Escalation Group": "CP-CHILE", Perimeter: "RIL", Pagerduty: "" },
                { "Escalation Group": "CP-COLOMBIA", Perimeter: "RIL", Pagerduty: "" },
                { "Escalation Group": "CP-MEXICO", Perimeter: "RIL", Pagerduty: "Yes" },
                { "Escalation Group": "CP-LOG-COLOMBIA", Perimeter: "RIL", Pagerduty: "" },
                { "Escalation Group": "CS-NETWORK-ITALY", Perimeter: "REDES ITALIA", Pagerduty: "Yes" },
                { "Escalation Group": "CS-WAREHOUSEBOX", Perimeter: "PICKING WAREHOUSE BOX", Pagerduty: "Yes" },
                { "Escalation Group": "CS-LOG-INFRA", Perimeter: "CAMBIOS Y ALTAS EN WSO ITALIA ", Pagerduty: "" },
                { "Escalation Group": "CS-DIGITAL-WORKPLACE", Perimeter: "GOOGLE ", Pagerduty: "" },
                { "Escalation Group": "CS-SAP-ARTICLE-AMI", Perimeter: "Problemas de valorizacion ", Pagerduty: "" },
            ]
        },
        'as400-commands': {
            title: 'AS400 Commands',
            type: 'tabs',
            content: {
                utility: [
                    { Function: 'Change from one machine to another without opening a new tab', Command: 'telnet + MachineName' },
                    { Function: 'Change library', Command: 'editlibl' },
                    { Function: 'Start SQL in AS400 - To query in AS400', Command: 'strsql' },
                    { Function: 'QUERY LQT in AS400', Command: 'CALL LQTLST' },
                    { Function: 'See Logs AS400', Command: 'DSPLOG' },
                    { Function: 'Verify the history of the center backup', Command: 'VIEWSAVE' },
                    { Function: 'Ping machines', Command: 'Ping machineXX' },
                    { Function: 'See jobs in machine', Command: 'workjobq' },
                    { Function: 'Messages in machine', Command: 'wrkmsg qsysopr' },
                    { Function: 'See devices in machine', Command: 'wrkoutq' },
                    { Function: 'See jobs individually, for example ss prelevement, ss radio', Command: 'Ss (job name)' },
                    { Function: 'Work description', Command: 'workjobd "escribimos work"' },
                    { Function: 'Check subsystems', Command: 'Strsbs (subsystem name)' },
                    { Function: 'Connection with Niagara', Command: 'qr dest(niagara)' },
                    { Function: 'MQREP Flows', Command: 'mqrep' },
                    { Function: 'See screen tables', Command: 'WRKPGM screen' },
                    { Function: 'Create profiles', Command: 'exploitusr' },
                    { Function: 'See and modify profiles', Command: 'wrkusrprf' },
                    { Function: 'Change Colis status / UAT', Command: 'call atmacolis' },
                    { Function: 'MENU PRELEVEMENT TMA', Command: 'CALL TMAPREL' },
                    { Function: 'Change EWM language of a colis (long colis to short)', Command: 'SSCC' }
                ],
                functionality: [
                    { Function: 'Main menu as400', Command: 'CALL SOHMUPC' },
                    { Function: '20 Menu GE', Command: 'gdmv2' },
                    { Function: 'View an article', Command: 'call prcvisee' },
                    { Function: 'View Colis', Command: 'call visucol' },
                    { Function: 'Parameter management', Command: 'call majenpr' },
                    { Function: ':menu : Warehouse Map', Command: 'CALL SOLIDFR "' },
                    { Function: 'SAP commands menu', Command: 'CALL SLTIXFR "' },
                    { Function: 'Param(trage des rafales)', Command: 'CALL SJGADFR "' },
                    { Function: 'Create parameters of a rafal', Command: 'CALL TMAPREL' },
                    { Function: 'E-commerce WAVES parameterization', Command: 'CALL SSQFDFR "' },
                    { Function: 'Rafales a la carta', Command: 'CALL SMLJUPC' },
                    { Function: 'UAT Suppression', Command: 'CALL PIDKDFR "' },
                    { Function: 'CNT Blocked by reappro', Command: 'CALL STNFDFR (* *)' },
                    { Function: 'View/Reedition/Reposition in stock Rafale', Command: 'CALL PGM(SJJ2XFR) PARM(* *)' },
                    { Function: 'Warehouse map', Command: 'CALL SOLIDFR "' }
                ],
                dispositives: [
                    { Function: 'menu modification bases RFIDs', Command: 'call SSF5DFR' },
                    { Function: 'ITRPRF Workstation & Printer Menu', Command: 'GO WRKDEV' },
                    { Function: 'Kill a transcriber', Command: 'endwtr impresora * immed' }
                ],
                passwords: [
                    { Function: 'Get menu passwords', Command: 'SELECT * FROM gdmdkf.gdmpoptes WHERE OLIBOP like \'%Visualization%\';' },
                    { Function: 'Get menu passwords SPAIN', Command: 'SELECT * FROM gdmdkf.gdmpoptes WHERE OPASSE !=\' \';' },
                    { Function: 'Get menu passwords ITALY', Command: 'SELECT * FROM gdmdkf.gdmlopt4it WHERE OPASSE !=\' \';' },
                    { Function: 'Get menu passwords ENGLISH', Command: 'select * from ANGLAIS.GDMLJNTUS WHERE OPASSE !=\'\' -- Passwords Turkish language TRDKL01' },
                    { Function: 'Get menu passwords ENGLISH', Command: 'select * from TURKISH.GDMPOPTUS WHERE OLIBOP like \'%Rafallerin%\'; -- Search for a menu on Turkish language TRDKL01' },
                    { Function: 'Get menu passwords ENGLISH', Command: 'select * from ANGLAIS.GDMLJNTUS WHERE OPASSE !=\'\' -- Passwords English language TRDKL01' },
                    { Function: 'Get menu passwords ENGLISH', Command: 'select * from ANGLAIS.GDMLJNTUS WHERE OLIBOP like \'%card%\'; -- Search for a menu on English language TRDKL01' },
                    { Function: 'Get menu passwords ENGLISH', Command: 'SELECT * FROM gdmdkf.gdmlopt4it WHERE OPASSE !=\' \'; -- Passwords IT AS400' },
                    { Function: 'Get menu passwords ENGLISH', Command: 'SELECT * FROM gdmdkf.gdmlopt4it WHERE OLIBOP like \'%Parametrage%\'; -- Search for a menu on IT AS400' },
                    { Function: 'Get menu passwords ENGLISH', Command: 'SELECT * FROM gdmdkf.GDMPOPT WHERE OPASSE !=\' \'; -- Passwords PT AS400' },
                    { Function: 'Get menu passwords ENGLISH', Command: 'SELECT * FROM gdmdkf.GDMPOPT WHERE OLIBOP like \'%Waves%\'; -- Search for a menu on PT AS400' },
                    { Function: 'Get menu passwords ENGLISH', Command: 'SELECT * FROM gdm.gdmpoptes WHERE OPASSE !=\' \'; -- Passwords ES AS400' },
                    { Function: 'Get menu passwords ENGLISH', Command: 'SELECT * FROM gdmdkf.gdmpoptes WHERE OLIBOP like \'%vagues%\'; -- Search for a menu on ES AS400' },
                    { Function: 'Get menu passwords ENGLISH', Command: 'SELECT * FROM gdmdkf.gdmpoptus WHERE OPASSE !=\' \'; -- Passwords MX AS400' },
                    { Function: 'Get menu passwords ENGLISH', Command: 'SELECT * FROM gdmdkf.gdmpoptus WHERE OLIBOP like \'%Tri%\'; -- Search for a menu on MX AS4S400' },
                    { Function: 'Get menu passwords ENGLISH', Command: 'SELECT * FROM ESPAGNOL.GDMLJNTUS WHERE OLIBOP like \'%nouveaux%\'; -- Search for a menu on MX AS400' }
                ]
            }
        },
         'as400-tables': {
            title: 'AS400 Tables',
            type: 'tabs',
            content: {
                rafales: [
                    { Table: 'SOCBCPP', 'Base Meaning': 'Line of the colis / rafale', 'Simplified Meaning': 'Lines that have colis associated with rafales' },
                    { Table: 'MTASREP', 'Base Meaning': 'Stock Movements', 'Simplified Meaning': 'Stock Movements - supposed and realized quantities, no. of picking and directions' },
                    { Table: 'MTA1REP', 'Base Meaning': 'Detail das Facturas', 'Simplified Meaning': 'Items that have reception (QUAI299) Picking (OPGMR) QC (PTONGA19) pending' },
                    { Table: 'MTA4REP', 'Base Meaning': 'Header das facturas', 'Simplified Meaning': 'Same as above with less details' },
                    { Table: 'MRNPREP', 'Base Meaning': 'Detail Action command/facture', 'Simplified Meaning': 'Associates the invoice to an internal code' },
                    { Table: 'SKITREP', 'Base Meaning': 'Colis and detail of command', 'Simplified Meaning': 'Associates the internal code to the colis (each item that is picked has 1 internal code)' },
                    { Table: 'MTFLOREP', 'Base Meaning': 'non livrés', 'Simplified Meaning': 'Not delivered' }
                ],
                replenishment: [
                    { Table: 'SCJAHREP', 'Base Meaning': 'paramètres calcul', 'Simplified Meaning': 'Calculations were executed and respective parameterization' },
                    { Table: 'SCJANREP', 'Base Meaning': 'lien demande / calcul', 'Simplified Meaning': 'Execution No. of the parameterization - associated with the calculation that generated' },
                    { Table: 'SMFLREP', 'Base Meaning': 'entete calcul', 'Simplified Meaning': 'Info of each calculation' }
                ],
                reception: [
                    { Flow: 'ASAPL', Header: 'SKHOCPP', Detail: 'SMCRCPP', 'General Explaining': 'Reception Orders flow that are sent to CAR, about the receptions that previously were ship from the CAC. In order to make the reception, AS400 CAR has to receive this flow.', 'Simplified Explaining': 'SAP sends a PO advance notice to CAR for goods shipped from CAC.' },
                    { Flow: 'ALOGX', Header: 'SKHRCPP', Detail: 'SKHSCPP', 'General Explaining': 'When CAC receive the goods, it has to inform SAP about it', 'Simplified Explaining': 'CAC and CAR notify SAP of PO receipt.' },
                    { Flow: 'BSAPL', Header: 'SKHYCPP', Detail: 'SLKMCPP', 'General Explaining': 'Other part of the information of reception flow in CAR. Since the CAC sends the Orders prepared inside Parcels created in their warehouse, there is this second flow, with Parcel information, which is used for the warehouse to make the reception by Parcel, instead of Order flow.', 'Simplified Explaining': 'SAP informs CAC and CAR about Parcels associated with a PO.' },
                    { Flow: 'BLOGX', Header: 'SKHTCPP', Detail: 'SKHUCPP', 'General Explaining': 'This flow is used to receive the goods in AS400 CAR, and its information, when sent, closes the reception in SAP side.', 'Simplified Explaining': 'CAR and CAC confirm PO and Parcel receipt to close the PO in SAP.' },
                    { Flow: 'CSAPL', Header: 'SKH9CPP', Detail: 'SLKSCPP', 'General Explaining': 'the orders that the CAC and CAR has to prepare in their picking in AS400', 'Simplified Explaining': 'SAP specifies what to pick for the order.' },
                    { Flow: 'CLOGX', Header: 'SKHYCPP', Detail: 'SLKMCPP', 'General Explaining': 'When the picking is done and the goods are sent, from the CAC to CAR or CAR to Destination', 'Simplified Explaining': 'CAR and CAC confirm that the ordered items have been shipped.' },
                    { Flow: 'DLOGX', Header: 'SKIDCPP', Detail: 'SKIDCPP', 'General Explaining': 'Flow of stock update between AS400 and SAP.', 'Simplified Explaining': 'Handles stock updates for IPs, quality control, or canceled orders to prevent stock discrepancies.' },
                    { Flow: 'ELOGX', Header: 'SKIECPP', Detail: 'SKIECPP', 'General Explaining': 'Daily flow of sending Stock Picture from AS400 to SAP. It doesn"t change the Stock in SAP, it only informs the system about the Stock in AS400.', 'Simplified Explaining': 'CAC and CAR send a daily stock update to SAP for confirmation.' },
                    { Flow: 'GSAPL', Header: 'SKH8CPP', Detail: 'SPEBCPP, SKHTCPP', 'General Explaining': 'Article referencing flow from SAP to AS400. It is important when; an article is created, when there are changes related to an article in SAP or if there is some problem with the article in AS400.', 'Simplified Explaining': 'SAP sends updates for specific articles.' }
                ]
            }
        },
        'bank-of-tickets': {
            title: 'Bank of Tickets',
            type: 'custom'
        }
    };
    
    // DOM element references
    const navMenu = document.getElementById('nav-menu');
    const contentArea = document.getElementById('content-area');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    // Navigation items configuration
    const navItems = [
        { id: 'home', text: 'Home', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>' },
        { id: 'key-links', text: 'Key Links', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>' },
        { id: 'perimeter', text: 'Perimeter', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>' },
        { id: 'run-log', text: 'RUN LOG', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>' },
        { id: 'as400-commands', text: 'AS400 Commands', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>' },
        { id: 'as400-tables', text: 'AS400 Tables', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>' },
        { id: 'bank-of-tickets', text: 'Bank of Tickets', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>'}
    ];

    /**
     * Renders the content for a given page ID into the main content area.
     * @param {string} pageId - The ID of the page to render.
     */
    const renderContent = (pageId) => {
         // Highlight the active navigation link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if(link.dataset.page === pageId) {
                link.classList.add('active');
            }
        });

        const pageData = siteData[pageId];
        if (!pageData) {
            contentArea.innerHTML = `<h2 class="text-2xl font-bold text-primary">Page not found</h2>`;
            return;
        }

        let html = `<h2 class="text-3xl font-bold mb-6 pb-2 border-b border-primary text-primary">${pageData.title}</h2>`;

        // Render content based on its type (links, tabs, table, etc.)
        if (pageData.type === 'links') {
            html += `
                <div class="mb-6 relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg class="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </span>
                    <input type="text" id="key-links-search" class="w-full p-2 pl-10 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary" placeholder="Search links...">
                </div>
            `;
            html += '<div id="key-links-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">';
            pageData.content.forEach((link, index) => {
                const itemClass = "link-item transition-all duration-300 shadow-sm hover:shadow-md";
                if (link.type === 'dropdown') {
                     html += `
                        <div class="${itemClass} relative">
                            <button id="dropdown-btn-${index}" class="w-full text-left p-4 bg-primary rounded-lg border border-primary hover:bg-info hover:border-accent flex justify-between items-center">
                                <h3 class="font-semibold text-lg text-accent">${link.name}</h3>
                                <svg class="w-5 h-5 text-accent transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            <div id="dropdown-content-${index}" class="hidden mt-2 py-2 bg-secondary rounded-lg shadow-xl absolute w-full z-10 border border-primary">
                                ${link.links.map((sublink, subIndex) => `
                                    ${subIndex > 0 ? '<div class="dropdown-item-separator"></div>' : ''}
                                    <div class="dropdown-link-item px-4 py-2">
                                        <a href="${sublink.url}" target="_blank" rel="noopener noreferrer" class="block text-primary font-medium">${sublink.name}</a>
                                        ${sublink.note ? `<p class="text-xs text-secondary mt-1">${sublink.note}</p>` : ''}
                                    </div>
                                `).join('')}
                                ${link.note ? `<div class="px-4 py-2 text-sm text-secondary bg-primary border-t border-primary">${link.note}</div>` : ''}
                            </div>
                        </div>
                    `;
                } else {
                    html += `
                        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="${itemClass} block p-4 bg-primary rounded-lg border border-primary hover:bg-info hover:border-accent">
                            <h3 class="font-semibold text-lg text-accent">${link.name}</h3>
                        </a>
                    `;
                }
            });
            html += '</div>';
        } else if (pageData.type === 'tabs') {
            html += `
                <div class="border-b border-primary">
                    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                        ${Object.keys(pageData.content).map((key, index) => `
                            <button class="tab-button whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${index === 0 ? 'active' : 'text-secondary hover:text-primary hover:border-secondary'}" data-tab="${key}">${key.charAt(0).toUpperCase() + key.slice(1)}</button>
                        `).join('')}
                    </nav>
                </div>
                ${Object.keys(pageData.content).map((key, index) => `
                    <div id="${key}-content" class="tab-content py-4 ${index > 0 ? 'hidden' : ''}"></div>
                `).join('')}
            `;
        } else if (pageData.type === 'table') {
             html += `
                <div class="flex flex-col md:flex-row justify-between items-center mb-4">
                    <div class="relative w-full">
                        <label for="table-search" class="sr-only">Search</label>
                        <input type="text" id="table-search" class="w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary" placeholder="Search...">
                    </div>
                </div>
            `;
            const headers = Object.keys(pageData.content[0]);
            html += '<div class="overflow-x-auto rounded-lg border border-primary"><table id="run-log-table" class="min-w-full bg-secondary">';
            html += '<thead><tr class="bg-primary">';
            headers.forEach(header => {
                html += `<th class="py-3 px-4 border-b border-primary text-left font-semibold text-secondary uppercase tracking-wider text-sm">${header}</th>`;
            });
            html += '</tr></thead><tbody>';
            pageData.content.forEach(row => {
                html += '<tr class="hover:bg-primary">';
                headers.forEach(header => {
                    html += `<td class="py-3 px-4 border-b border-primary text-primary">${row[header]}</td>`;
                });
                html += '</tr>';
            });
            html += '</tbody></table></div>';
        } else if (pageData.type === 'custom' && pageId === 'bank-of-tickets') {
            html = `<h2 class="text-3xl font-bold mb-6 pb-2 border-b border-primary text-primary">${pageData.title}</h2>`;
            html += renderBankOfTicketsContent();
        } else {
            html += pageData.content;
        }

        contentArea.innerHTML = html;
        
        if (pageData.type === 'links') {
            pageData.content.forEach((link, index) => {
                if (link.type === 'dropdown') {
                    const dropdownButton = document.getElementById(`dropdown-btn-${index}`);
                    if(dropdownButton) {
                        dropdownButton.addEventListener('click', (e) => {
                            e.stopPropagation(); 
                            const clickedContent = document.getElementById(`dropdown-content-${index}`);
                            const isOpening = clickedContent.classList.contains('hidden');

                            document.querySelectorAll('[id^="dropdown-content-"]').forEach(content => {
                                content.classList.add('hidden');
                            });
                             document.querySelectorAll('[id^="dropdown-btn-"] svg').forEach(svg => {
                                svg.classList.remove('rotate-180');
                            });

                            if (isOpening) {
                                clickedContent.classList.remove('hidden');
                                dropdownButton.querySelector('svg').classList.add('rotate-180');
                            }
                        });
                    }
                }
            });

            const searchInput = document.getElementById('key-links-search');
            const linkItems = document.querySelectorAll('#key-links-grid .link-item');
            
            searchInput.addEventListener('keyup', () => {
                const searchTerm = searchInput.value.toLowerCase();
                linkItems.forEach(item => {
                    item.style.display = item.textContent.toLowerCase().includes(searchTerm) ? '' : 'none';
                });
            });

        }

        if (pageId === 'perimeter' || pageId === 'as400-commands' || pageId === 'as400-tables') {
            setupTabs(pageData);
        } else if (pageId === 'run-log') {
            setupTableSearch('table-search', 'run-log-table');
        } else if (pageId === 'bank-of-tickets') {
            initializeBankOfTickets();
        }
    };
    
    const setupTableSearch = (searchInputId, tableId) => {
        const searchInput = document.getElementById(searchInputId);
        const table = document.getElementById(tableId);
        if (!searchInput || !table) return;

        const rows = table.getElementsByTagName('tr');
        const filterTable = () => {
            const searchValue = searchInput.value.toLowerCase();
            for (let i = 1; i < rows.length; i++) {
                rows[i].style.display = rows[i].textContent.toLowerCase().includes(searchValue) ? '' : 'none';
            }
        };
        searchInput.addEventListener('keyup', filterTable);
    };
    
    const setupTabs = (pageData) => {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        
        Object.keys(pageData.content).forEach(key => {
            renderTableInTab(`${key}-content`, pageData.content[key], { countryFilter: key === 'zes' || key === 'zen' });
        });

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                tabContents.forEach(content => content.classList.add('hidden'));
                document.getElementById(`${button.dataset.tab}-content`).classList.remove('hidden');
            });
        });
    };

    const renderTableInTab = (containerId, data, filterOptions) => {
        const container = document.getElementById(containerId);
        if (!container || !data || data.length === 0) return;

        let tableHtml = `
            <div class="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                ${filterOptions.countryFilter ? `
                <div class="relative w-full md:w-1/3">
                    <select id="${containerId}-country-filter" class="w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                        <option value="">All Countries</option>
                    </select>
                </div>` : ''}
                <div class="relative w-full ${filterOptions.countryFilter ? 'md:w-2/3' : ''}">
                    <input type="text" id="${containerId}-search" class="w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary" placeholder="Search...">
                </div>
            </div>
        `;
        const headers = Object.keys(data[0]);
        tableHtml += `<div class="overflow-x-auto rounded-lg border border-primary"><table id="${containerId}-table" class="min-w-full bg-secondary">`;
        tableHtml += '<thead><tr class="bg-primary">';
        headers.forEach(header => {
            tableHtml += `<th class="py-3 px-4 border-b border-primary text-left font-semibold text-secondary uppercase tracking-wider text-sm">${header}</th>`;
        });
        tableHtml += '</tr></thead><tbody>';
        data.forEach(row => {
            tableHtml += '<tr class="hover:bg-primary">';
            headers.forEach(header => {
                tableHtml += `<td class="py-3 px-4 border-b border-primary text-primary">${row[header]}</td>`;
            });
            tableHtml += '</tr>';
        });
        tableHtml += '</tbody></table></div>';
        container.innerHTML = tableHtml;

        const searchInput = document.getElementById(`${containerId}-search`);
        const table = document.getElementById(`${containerId}-table`);
        const rows = table.getElementsByTagName('tr');
        let countryFilter;

        if (filterOptions.countryFilter) {
            countryFilter = document.getElementById(`${containerId}-country-filter`);
            const countries = [...new Set(Array.from(rows).slice(1).map(row => row.cells[0].textContent))].sort();
            countries.forEach(country => {
                countryFilter.innerHTML += `<option value="${country}">${country}</option>`;
            });
        }

        const filterTable = () => {
            const searchValue = searchInput.value.toLowerCase();
            const countryValue = filterOptions.countryFilter ? countryFilter.value.toLowerCase() : '';

            for (let i = 1; i < rows.length; i++) {
                const searchMatch = rows[i].textContent.toLowerCase().includes(searchValue);
                const countryMatch = !filterOptions.countryFilter || countryValue === '' || rows[i].cells[0].textContent.toLowerCase() === countryValue;
                rows[i].style.display = (searchMatch && countryMatch) ? '' : 'none';
            }
        };

        searchInput.addEventListener('keyup', filterTable);
        if(filterOptions.countryFilter) countryFilter.addEventListener('change', filterTable);
    };

    const renderBankOfTicketsContent = () => {
        return `
            <div id="ticket-list-view">
                <div class="mb-8 p-6 border border-primary rounded-lg bg-primary">
                    <h3 class="text-xl font-semibold mb-4 text-primary">Add a New Ticket</h3>
                    <form id="ticket-form" class="space-y-4">
                        <div>
                            <label for="category" class="block text-sm font-medium text-primary">Category</label>
                            <select id="category" name="category" class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                                <option>B2C</option><option>B2B</option><option>PTL</option><option>HHRR</option>
                            </select>
                        </div>
                        <div>
                            <label for="subcategory" class="block text-sm font-medium text-primary">Subcategory</label>
                            <select id="subcategory" name="subcategory" class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                                <option>Twist</option><option>Manhattan</option><option>Shipperbox</option><option>ShipIt</option><option>Retbox</option><option>Brooklyn</option><option>Cups</option><option>AS400</option><option>WarehouseBox</option><option>Tacisa</option><option>Cape</option><option>Tatoo</option><option>Next</option><option>HDA</option><option>DCMR</option><option>Google</option><option>Eplanning</option><option>Identity Access</option>
                            </select>
                        </div>
                        <div>
                            <label for="problem" class="block text-sm font-medium text-primary">Problem / Process</label>
                            <textarea id="problem" name="problem" rows="3" class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary"></textarea>
                        </div>
                        <div>
                            <label for="attachment" class="block text-sm font-medium text-primary">Attachment (PDF only)</label>
                            <input type="file" id="attachment" name="attachment" accept=".pdf" class="mt-1 block w-full text-sm text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-info file:text-accent hover:file:bg-info"/>
                        </div>
                        <button type="submit" id="submit-ticket-btn" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">Add Ticket</button>
                    </form>
                </div>
                <div>
                    <h3 class="text-xl font-semibold mb-4 text-primary">Ticket List</h3>
                    <input type="text" id="ticket-search" class="w-full p-2 border border-primary rounded-md mb-4 focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary" placeholder="Search tickets...">
                    <div class="overflow-x-auto rounded-lg border border-primary">
                        <table id="ticket-table" class="min-w-full bg-secondary">
                            <thead>
                                <tr class="bg-primary">
                                    <th class="py-3 px-4 border-b border-primary text-left font-semibold text-secondary uppercase tracking-wider text-sm">Category</th>
                                    <th class="py-3 px-4 border-b border-primary text-left font-semibold text-secondary uppercase tracking-wider text-sm">Subcategory</th>
                                    <th class="py-3 px-4 border-b border-primary text-left font-semibold text-secondary uppercase tracking-wider text-sm">Problem / Process</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    };

    const initializeBankOfTickets = () => {
        const ticketForm = document.getElementById('ticket-form');
        const ticketTableBody = document.querySelector('#ticket-table tbody');
        const ticketSearch = document.getElementById('ticket-search');
        let tickets = JSON.parse(localStorage.getItem('tickets')) || [];

        const renderTickets = (t) => {
            ticketTableBody.innerHTML = '';
            t.forEach(ticket => {
                const row = document.createElement('tr');
                row.className = 'hover:bg-primary cursor-pointer';
                row.dataset.id = ticket.id;
                row.innerHTML = `
                    <td class="py-3 px-4 border-b border-primary text-primary">${ticket.category}</td>
                    <td class="py-3 px-4 border-b border-primary text-primary">${ticket.subcategory}</td>
                    <td class="py-3 px-4 border-b border-primary text-primary">${ticket.problem}</td>
                `;
                row.addEventListener('click', () => renderTicketDetails(ticket.id));
                ticketTableBody.appendChild(row);
            });
        };
        
        renderTickets(tickets);

        ticketForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('submit-ticket-btn');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            const formData = new FormData(ticketForm);
            const attachment = formData.get('attachment');
            
            const saveTicket = (attachmentData = null) => {
                tickets.push({
                    id: Date.now(),
                    category: formData.get('category'),
                    subcategory: formData.get('subcategory'),
                    problem: formData.get('problem'),
                    attachment: attachmentData
                });
                localStorage.setItem('tickets', JSON.stringify(tickets));
                renderTickets(tickets);
                ticketForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Add Ticket';
            };

            if (attachment && attachment.size > 0) {
                const reader = new FileReader();
                reader.onloadend = () => saveTicket(reader.result);
                reader.readAsDataURL(attachment);
            } else {
                saveTicket();
            }
        });
        
        ticketSearch.addEventListener('keyup', () => {
            const searchValue = ticketSearch.value.toLowerCase();
            const filteredTickets = tickets.filter(t => 
                Object.values(t).some(val => String(val).toLowerCase().includes(searchValue))
            );
            renderTickets(filteredTickets);
        });
    };

    const renderTicketDetails = (ticketId) => {
        const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
        const ticket = tickets.find(t => t.id == ticketId);

        if (ticket) {
            let html = `
                <button id="back-to-tickets" class="mb-6 inline-flex items-center gap-2 text-accent hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                    Back to Ticket List
                </button>
                <h3 class="text-2xl font-bold mb-4 text-primary">${ticket.problem}</h3>
                <div class="space-y-2 text-primary">
                    <p><strong>Category:</strong> ${ticket.category}</p>
                    <p><strong>Subcategory:</strong> ${ticket.subcategory}</p>
                </div>
            `;
            if (ticket.attachment) {
                html += `
                    <div class="mt-6">
                        <h4 class="text-xl font-semibold mb-2 text-primary">Attachment</h4>
                        <iframe src="${ticket.attachment}" width="100%" height="600px" class="border rounded-md border-primary"></iframe>
                    </div>
                `;
            }
            contentArea.innerHTML = html;
            document.getElementById('back-to-tickets').addEventListener('click', () => renderContent('bank-of-tickets'));
        } else {
            contentArea.innerHTML = `<p>Ticket not found.</p>`;
        }
    };

    // --- INITIALIZATION ---

    navItems.forEach(item => {
        const link = document.createElement('a');
        link.href = '#';
        link.dataset.page = item.id;
        link.className = 'nav-link flex items-center p-2 my-1 rounded-md text-sidebar hover:bg-sidebar-hover transition-colors';
        link.innerHTML = `${item.icon} <span class="ml-3">${item.text}</span>`;
        navMenu.appendChild(link);
    });

    navMenu.addEventListener('click', (e) => {
        e.preventDefault();
        const link = e.target.closest('a.nav-link');
        if (link && link.dataset.page) {
            renderContent(link.dataset.page);
            if (window.innerWidth < 1024) sidebar.classList.add('-translate-x-full');
        }
    });
    
    menuToggle.addEventListener('click', () => sidebar.classList.toggle('-translate-x-full'));

    const themeToggle = document.getElementById('theme-toggle');
    const applyTheme = (isDark) => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', isDark);
        document.documentElement.classList.toggle('light', !isDark); // Added for CSS specificity
        themeToggle.checked = isDark;
    };
    themeToggle.addEventListener('change', (e) => applyTheme(e.target.checked));
    
    // Set initial theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme === 'dark' || (savedTheme === null && prefersDark));

    // Add a listener for clicks outside of dropdowns to close them
    window.addEventListener('click', (e) => {
        if (!e.target.closest('[id^="dropdown-btn-"]')) {
             document.querySelectorAll('[id^="dropdown-content-"]').forEach(content => {
                content.classList.add('hidden');
            });
            document.querySelectorAll('[id^="dropdown-btn-"] svg').forEach(svg => {
                svg.classList.remove('rotate-180');
            });
        }
    });

    renderContent('home');
});

