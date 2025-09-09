import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { siteData } from './data.js';
import { 
    collection, 
    doc, 
    addDoc, 
    getDoc, 
    onSnapshot, 
    setDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where, 
    getDocs 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {

    // --- Firebase Initialization ---
    let app, db, auth, userId; // <<< Declare auth here at the top of the scope
    let unsubscribes = [];

    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

    try {
        const firebaseConfig = {
            // Your config here
        };

        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app); // Assign auth here

        // >>> MOVE THIS BLOCK HERE <<<
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                userId = user.uid;
                console.log("Authenticated with Firebase UID:", userId);
                startApp(); // Function to start the application after authentication
            } else {
                console.log("No user signed in. Attempting anonymous sign-in...");
                try {
                    // For live deployment, __initial_auth_token will be undefined, so it goes to signInAnonymously
                    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                        await signInWithCustomToken(auth, __initial_auth_token);
                    } else {
                        await signInAnonymously(auth); // This should create an anonymous user
                    }
                } catch (error) {
                    console.error("Error during anonymous sign-in or custom token sign-in:", error);
                    // Optionally show a message to the user
                }
            }
        });
        // >>> END OF MOVED BLOCK <<<

    } catch (e) {
        console.error("Firebase config is not available or invalid. App will not function correctly.", e);
        // Hide loader and show an error message.
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        if (appContainer) appContainer.innerHTML = '<div class="w-full h-full flex items-center justify-center text-red-500 font-bold">Failed to load app. Check console for details.</div>';
        return;
    }

    // ... (rest of your rhub.js file)
    
    // --- DOM element references ---
    const navMenu = document.getElementById('nav-menu');
    const contentArea = document.getElementById('content-area');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const modalContainer = document.getElementById('modal-container');

    // Navigation items configuration
    const navItems = [
        { id: 'home', text: 'Home', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>' },
        { id: 'key-links', text: 'Key Links', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>' },
        { id: 'perimeter', text: 'Perimeter', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>' },
        { id: 'run-log', text: 'RUN LOG', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>' },
        { id: 'as400-commands', text: 'AS400 Commands', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>' },
        { id: 'as400-tables', text: 'AS400 Tables', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>' },
        { id: 'bank-of-tickets', text: 'Bank of Tickets', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>'},
        { id: 'tasks', text: 'Tasks', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>'},
        { id: 'synchros', text: 'Synchros', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>'},
        { id: 'known-issues', text: 'Known Issues', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'},
        { id: 'dutys', text: 'DUTYS', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>'},
        { id: 'archived', text: 'Archived', icon: '<svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>'}
    ];
    
    /**
     * Cleans up all active Firestore snapshot listeners.
     */
    const cleanupListeners = () => {
        unsubscribes.forEach(unsub => unsub());
        unsubscribes = [];
    };

    /**
     * Sanitizes a string to prevent XSS attacks.
     * @param {string} str - The string to sanitize.
     * @returns {string} The sanitized string.
     */
    const sanitizeHTML = (str) => {
        if (typeof str !== 'string') return '';
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

    /**
     * Renders the content for a given page ID into the main content area.
     * @param {string} pageId - The ID of the page to render.
     */
    const renderContent = (pageId) => {
        cleanupListeners(); // Clean up old listeners before rendering new content

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            }
        });

        const pageData = siteData[pageId];
        if (!pageData) {
            contentArea.innerHTML = `<h2 class="text-2xl font-bold text-primary">Page not found</h2>`;
            return;
        }

        let html = `<h2 class="text-3xl font-bold mb-6 pb-2 border-b border-primary text-primary">${pageData.title}</h2>`;

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
            html += `<div class="overflow-x-auto rounded-lg border border-primary"><table id="run-log-table" class="min-w-full bg-secondary compact-table">`;
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
        } else if (pageData.type === 'custom') {
             html = `<h2 class="text-3xl font-bold mb-6 pb-2 border-b border-primary text-primary">${pageData.title}</h2>`;
            switch (pageId) {
                case 'bank-of-tickets': html += renderBankOfTicketsContent(); break;
                case 'tasks': html += renderTasksContent(); break;
                case 'synchros': html += renderSynchrosContent(); break;
                case 'known-issues': html += renderKnownIssuesContent(); break;
                case 'dutys': html += renderDutysContent(); break;
                case 'archived': html += renderArchivedContent(); break;
            }
        } else {
            html += pageData.content;
        }

        contentArea.innerHTML = html;
        
        // Post-render initialization
        if (pageData.type === 'links') {
             pageData.content.forEach((link, index) => {
                if (link.type === 'dropdown') {
                    const dropdownButton = document.getElementById(`dropdown-btn-${index}`);
                    if(dropdownButton) {
                        dropdownButton.addEventListener('click', (e) => {
                            e.stopPropagation(); 
                            const clickedContent = document.getElementById(`dropdown-content-${index}`);
                            const isOpening = clickedContent.classList.contains('hidden');
                            document.querySelectorAll('[id^="dropdown-content-"]').forEach(content => content.classList.add('hidden'));
                            document.querySelectorAll('[id^="dropdown-btn-"] svg').forEach(svg => svg.classList.remove('rotate-180'));
                            if (isOpening) {
                                clickedContent.classList.remove('hidden');
                                dropdownButton.querySelector('svg').classList.add('rotate-180');
                            }
                        });
                    }
                }
            });
            const searchInput = document.getElementById('key-links-search');
            if (searchInput) {
                const linkItems = document.querySelectorAll('#key-links-grid .link-item, #key-links-grid > a');
                searchInput.addEventListener('keyup', () => {
                    const searchTerm = searchInput.value.toLowerCase();
                    linkItems.forEach(item => {
                        item.style.display = item.textContent.toLowerCase().includes(searchTerm) ? '' : 'block';
                    });
                });
            }
        }

        if (pageId === 'perimeter' || pageId === 'as400-commands' || pageId === 'as400-tables') {
            setupTabs(pageData);
        } else if (pageId === 'run-log') {
            setupTableSearch('table-search', 'run-log-table');
        } else if (pageId === 'bank-of-tickets') {
            initializeBankOfTickets();
        } else if (pageId === 'tasks') {
            initializeTasksPage();
        } else if (pageId === 'synchros') {
            initializeSynchrosPage();
        } else if (pageId === 'known-issues') {
            initializeKnownIssuesPage();
        } else if (pageId === 'dutys') {
            initializeDutysPage();
        } else if (pageId === 'archived') {
            initializeArchivedPage();
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
                tabButtons.forEach(btn => btn.classList.remove('active', 'border-accent', 'text-accent'));
                button.classList.add('active', 'border-accent', 'text-accent');
                tabContents.forEach(content => content.classList.add('hidden'));
                document.getElementById(`${button.dataset.tab}-content`).classList.remove('hidden');
            });
        });

        // Activate the first tab by default
        if(tabButtons.length > 0) {
            tabButtons[0].click();
        }
    };

    const renderTableInTab = (containerId, data, filterOptions) => {
        const container = document.getElementById(containerId);
        if (!container || !data || data.length === 0) {
            if(container) container.innerHTML = "<p>No data available.</p>";
            return;
        }

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
    
    const showGenericDeleteConfirmation = ({ itemType, onConfirm, permanent = false }) => {
        const title = permanent ? 'Permanently Delete?' : 'Confirm Deletion';
        const message = permanent 
            ? `Are you sure you want to permanently delete the selected ${itemType}(s)? This action cannot be undone.`
            : `Are you sure you want to delete this ${itemType}? It will be moved to the archive.`;
        
        const modalHTML = `
            <div class="modal-overlay" id="delete-modal-overlay">
                <div class="modal-content text-center">
                    <h3 class="text-xl font-bold mb-4">${title}</h3>
                    <p class="text-secondary mb-6">${message}</p>
                    <div class="flex justify-center gap-4">
                        <button id="cancel-delete-btn" class="py-2 px-4 rounded-md bg-secondary text-primary">Cancel</button>
                        <button id="confirm-delete-btn" class="py-2 px-4 rounded-md bg-danger text-white">Delete</button>
                    </div>
                </div>
            </div>
        `;
        modalContainer.innerHTML = modalHTML;
        
        document.getElementById('confirm-delete-btn').onclick = () => {
            onConfirm();
            modalContainer.innerHTML = '';
        };

        document.getElementById('cancel-delete-btn').onclick = () => {
            modalContainer.innerHTML = '';
        };
        document.getElementById('delete-modal-overlay').onclick = (e) => {
             if (e.target.id === 'delete-modal-overlay') {
                modalContainer.innerHTML = '';
             }
        };
    };

    const archiveItem = async (itemType, item) => {
        if (!userId) return;
        const archiveCollection = collection(db, `artifacts/${appId}/users/${userId}/archivedItems`);
        await addDoc(archiveCollection, {
            ...item,
            archivedFrom: itemType,
            archivedDate: new Date().toISOString().split('T')[0]
        });
        
        const sourceCollectionName = {
            'Ticket': 'tickets',
            'Task': 'tasks',
            'Synchro': 'synchros',
            'Known Issue': 'known-issues',
            'Duty': 'dutys'
        }[itemType];

        if(sourceCollectionName) {
            const itemDocRef = doc(db, `artifacts/${appId}/users/${userId}/${sourceCollectionName}`, item.id);
            await deleteDoc(itemDocRef);
        }
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
                            <textarea id="problem" name="problem" rows="9" class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary"></textarea>
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
                                    <th class="py-3 px-4 border-b border-primary text-right font-semibold text-secondary uppercase tracking-wider text-sm">Actions</th>
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
        if (!userId) return;
        const ticketForm = document.getElementById('ticket-form');
        const ticketTableBody = document.querySelector('#ticket-table tbody');
        const ticketSearch = document.getElementById('ticket-search');
        let localTicketsCache = [];
        const ticketsCollection = collection(db, `artifacts/${appId}/users/${userId}/tickets`);

        const renderTickets = (tickets) => {
            if(!ticketTableBody) return;
            ticketTableBody.innerHTML = '';
            tickets.forEach(ticket => {
                const row = document.createElement('tr');
                row.className = 'hover:bg-primary ticket-row';
                row.dataset.id = ticket.id;
                
                const problemText = sanitizeHTML(ticket.problem);
                const truncatedProblem = problemText.length > 50 ? problemText.substring(0, 50) + '...' : problemText;

                row.innerHTML = `
                    <td class="py-3 px-4 border-b border-primary text-primary">${sanitizeHTML(ticket.category)}</td>
                    <td class="py-3 px-4 border-b border-primary text-primary">${sanitizeHTML(ticket.subcategory)}</td>
                    <td class="py-3 px-4 border-b border-primary text-primary">${truncatedProblem}</td>
                    <td class="py-3 px-4 border-b border-primary text-primary text-right">
                        <div class="actions-wrapper justify-end">
                            <button class="edit-btn p-1 rounded-md bg-edit text-white" data-id="${ticket.id}">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z"></path></svg>
                            </button>
                            <button class="delete-btn p-1 rounded-md bg-danger text-white" data-id="${ticket.id}">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    </td>
                `;
                
                row.querySelector('.edit-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    showEditModal(ticket.id);
                });

                row.querySelector('.delete-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    showGenericDeleteConfirmation({
                        itemType: 'ticket',
                        onConfirm: () => archiveItem('Ticket', ticket)
                    });
                });

                row.addEventListener('click', () => renderTicketDetails(ticket.id));
                ticketTableBody.appendChild(row);
            });
        };
        
        const unsubscribe = onSnapshot(ticketsCollection, (snapshot) => {
            localTicketsCache = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            renderTickets(localTicketsCache);
        });
        unsubscribes.push(unsubscribe);

        if(ticketForm) {
            ticketForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitBtn = document.getElementById('submit-ticket-btn');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting...';

                const formData = new FormData(ticketForm);
                const attachment = formData.get('attachment');
                
                const saveTicket = async (attachmentData = null) => {
                    await addDoc(ticketsCollection, {
                        category: sanitizeHTML(formData.get('category')),
                        subcategory: sanitizeHTML(formData.get('subcategory')),
                        problem: sanitizeHTML(formData.get('problem')),
                        attachment: attachmentData,
                        createdAt: new Date()
                    });
                    ticketForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Add Ticket';
                };

                if (attachment && attachment.size > 0) {
                    const reader = new FileReader();
                    reader.onloadend = () => saveTicket(reader.result);
                    reader.readAsDataURL(attachment);
                } else {
                    await saveTicket();
                }
            });
        }
        
       if (ticketSearch) {
            ticketSearch.addEventListener('keyup', () => {
                const searchValue = ticketSearch.value.toLowerCase();
                const filteredTickets = localTicketsCache.filter(t => 
                    Object.values(t).some(val => String(val).toLowerCase().includes(searchValue))
                );
                renderTickets(filteredTickets);
            });
        }
    };

    const showEditModal = async (ticketId) => {
        if(!userId) return;
        const ticketDocRef = doc(db, `artifacts/${appId}/users/${userId}/tickets`, ticketId);
        const ticketSnapshot = await getDoc(ticketDocRef);
        if (!ticketSnapshot.exists()) return;
        const ticket = ticketSnapshot.data();

        const modalHTML = `
             <div class="modal-overlay" id="edit-modal-overlay">
                <div class="modal-content">
                    <h3 class="text-xl font-bold mb-4">Edit Ticket</h3>
                    <form id="edit-ticket-form" class="space-y-4">
                        <div>
                            <label for="edit-category" class="block text-sm font-medium text-primary">Category</label>
                            <select id="edit-category" name="category" class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                                <option>B2C</option><option>B2B</option><option>PTL</option><option>HHRR</option>
                            </select>
                        </div>
                        <div>
                            <label for="edit-subcategory" class="block text-sm font-medium text-primary">Subcategory</label>
                            <select id="edit-subcategory" name="subcategory" class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                                 <option>Twist</option><option>Manhattan</option><option>Shipperbox</option><option>ShipIt</option><option>Retbox</option><option>Brooklyn</option><option>Cups</option><option>AS400</option><option>WarehouseBox</option><option>Tacisa</option><option>Cape</option><option>Tatoo</option><option>Next</option><option>HDA</option><option>DCMR</option><option>Google</option><option>Eplanning</option><option>Identity Access</option>
                            </select>
                        </div>
                        <div>
                            <label for="edit-problem" class="block text-sm font-medium text-primary">Problem / Process</label>
                            <textarea id="edit-problem" name="problem" rows="12" class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary"></textarea>
                        </div>
                        <div>
                            <label for="edit-attachment" class="block text-sm font-medium text-primary">Attachment (PDF only)</label>
                             <div id="current-attachment-info" class="text-sm text-secondary mb-2"></div>
                            <input type="file" id="edit-attachment" name="attachment" accept=".pdf" class="mt-1 block w-full text-sm text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-info file:text-accent hover:file:bg-info"/>
                        </div>
                         <div class="flex justify-end gap-4">
                            <button type="button" id="cancel-edit-btn" class="py-2 px-4 rounded-md bg-secondary text-primary">Cancel</button>
                            <button type="submit" class="py-2 px-4 rounded-md bg-accent text-white">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        modalContainer.innerHTML = modalHTML;
        
        document.getElementById('edit-category').value = ticket.category;
        document.getElementById('edit-subcategory').value = ticket.subcategory;
        document.getElementById('edit-problem').value = ticket.problem;
        
        const attachmentInfo = document.getElementById('current-attachment-info');
        if (ticket.attachment) {
            attachmentInfo.innerHTML = `Current file attached. Upload a new file to replace it.`;
        } else {
            attachmentInfo.innerHTML = `No file attached.`;
        }


        document.getElementById('edit-ticket-form').onsubmit = (e) => {
            e.preventDefault();
            const form = e.target;
            const newAttachmentFile = form.attachment.files[0];

            const updateTicketData = async (newAttachmentData) => {
                const updatedData = {
                    category: sanitizeHTML(form.category.value),
                    subcategory: sanitizeHTML(form.subcategory.value),
                    problem: sanitizeHTML(form.problem.value),
                };
                if (newAttachmentData !== undefined) {
                    updatedData.attachment = newAttachmentData;
                }
                await updateDoc(ticketDocRef, updatedData);
                modalContainer.innerHTML = '';
            };
            
            if (newAttachmentFile) {
                const reader = new FileReader();
                reader.onloadend = () => updateTicketData(reader.result);
                reader.readAsDataURL(newAttachmentFile);
            } else {
                 updateTicketData(ticket.attachment);
            }
        };

        document.getElementById('cancel-edit-btn').onclick = () => modalContainer.innerHTML = '';
        document.getElementById('edit-modal-overlay').onclick = (e) => {
            if (e.target.id === 'edit-modal-overlay') modalContainer.innerHTML = '';
        };
    };

    const renderTicketDetails = async (ticketId) => {
        if(!userId) return;
        const ticketDocRef = doc(db, `artifacts/${appId}/users/${userId}/tickets`, ticketId);
        const ticketSnapshot = await getDoc(ticketDocRef);

        if (ticketSnapshot.exists()) {
            const ticket = ticketSnapshot.data();
            let html = `
                <button id="back-to-tickets" class="mb-6 inline-flex items-center gap-2 text-accent hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                    Back to Ticket List
                </button>
                <h3 class="text-2xl font-bold mb-4 text-primary">${sanitizeHTML(ticket.problem)}</h3>
                <div class="space-y-2 text-primary">
                    <p><strong>Category:</strong> ${sanitizeHTML(ticket.category)}</p>
                    <p><strong>Subcategory:</strong> ${sanitizeHTML(ticket.subcategory)}</p>
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

    const renderTasksContent = () => {
        return `
            <div id="task-board-container" class="space-y-8">
                <div class="p-6 border border-primary rounded-lg bg-primary">
                    <h3 class="text-xl font-semibold mb-4 text-primary">Add a New Task</h3>
                    <form id="task-form" class="space-y-4 md:space-y-0 md:flex md:gap-4 md:items-end">
                        <div class="flex-grow">
                            <label for="task-text" class="block text-sm font-medium text-primary">Task Description</label>
                            <textarea id="task-text" name="task-text" rows="6" required class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary"></textarea>
                        </div>
                        <div class="flex-grow">
                            <label for="task-assigned" class="block text-sm font-medium text-primary">Assign To</label>
                            <input type="text" id="task-assigned" name="task-assigned" required class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                        </div>
                        <div class="flex-grow">
                            <label for="task-due" class="block text-sm font-medium text-primary">Due Date</label>
                            <input type="text" id="task-due" name="task-due" required placeholder="Select Date..." class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                        </div>
                        <button type="submit" class="w-full md:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">Add Task</button>
                    </form>
                </div>

                <div class="mt-8">
                    <input type="text" id="task-search" class="w-full p-2 border border-primary rounded-md mb-4 focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary" placeholder="Search tasks by description or assignee...">
                    <div id="task-board" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="task-column">
                            <h3 class="font-bold text-lg mb-4 p-3 rounded-md bg-secondary text-primary text-center">To Do</h3>
                            <div class="task-list min-h-[200px] p-2 rounded-lg" data-status="todo"></div>
                        </div>
                        <div class="task-column">
                            <h3 class="font-bold text-lg mb-4 p-3 rounded-md bg-secondary text-primary text-center">In Progress</h3>
                            <div class="task-list min-h-[200px] p-2 rounded-lg" data-status="inprogress"></div>
                        </div>
                        <div class="task-column">
                            <h3 class="font-bold text-lg mb-4 p-3 rounded-md bg-secondary text-primary text-center">Done</h3>
                            <div class="task-list min-h-[200px] p-2 rounded-lg" data-status="done"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    const initializeTasksPage = () => {
        if (!userId) return;
        const taskForm = document.getElementById('task-form');
        const taskLists = document.querySelectorAll('.task-list');
        const taskSearch = document.getElementById('task-search');
        let localTasksCache = [];
        let draggedTaskId = null;
        const tasksCollection = collection(db, `artifacts/${appId}/users/${userId}/tasks`);

        const flatpickrConfig = {
            dateFormat: "Y-m-d",
            defaultDate: "today",
            minDate: "today"
        };
        flatpickr("#task-due", flatpickrConfig);

        const renderTasks = (tasks) => {
            taskLists.forEach(list => list.innerHTML = '');
            tasks.forEach(task => {
                const list = document.querySelector(`.task-list[data-status="${task.status}"]`);
                if (list) {
                    const taskCard = document.createElement('div');
                    taskCard.className = 'task-card';
                    taskCard.draggable = true;
                    taskCard.dataset.id = task.id;

                    taskCard.innerHTML = `
                       <div class="flex justify-between items-start">
                            <div>
                                <p class="text-primary font-medium pr-4">${sanitizeHTML(task.text)}</p>
                                <div class="task-meta mt-2">
                                    <span>
                                        <strong class="text-primary">${sanitizeHTML(task.assignedTo)}</strong>
                                        <span class="mx-1">|</span>
                                        <span>Due: ${task.dueDate}</span>
                                    </span>
                                </div>
                            </div>
                            <div class="card-actions">
                                <button class="edit-task-btn p-1 rounded-md bg-edit text-white" data-id="${task.id}">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z"></path></svg>
                                </button>
                                <button class="delete-task-btn p-1 rounded-md bg-danger text-white" data-id="${task.id}">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                        </div>
                    `;
                    list.appendChild(taskCard);
                }
            });
        };

        const unsubscribe = onSnapshot(tasksCollection, (snapshot) => {
            localTasksCache = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            renderTasks(localTasksCache);
        });
        unsubscribes.push(unsubscribe);
        
        taskForm.addEventListener('submit', async e => {
            e.preventDefault();
            const formData = new FormData(taskForm);
            await addDoc(tasksCollection, {
                text: sanitizeHTML(formData.get('task-text')),
                assignedTo: sanitizeHTML(formData.get('task-assigned')),
                dueDate: formData.get('task-due'),
                status: 'todo',
                createdAt: new Date()
            });
            taskForm.reset();
            flatpickr("#task-due", flatpickrConfig);
        });

        taskSearch.addEventListener('keyup', () => {
            const searchTerm = taskSearch.value.toLowerCase();
            const filtered = localTasksCache.filter(task =>
                task.text.toLowerCase().includes(searchTerm) ||
                task.assignedTo.toLowerCase().includes(searchTerm)
            );
            renderTasks(filtered);
        });
        
        contentArea.addEventListener('click', e => {
            const deleteBtn = e.target.closest('.delete-task-btn');
            if (deleteBtn) {
                const taskId = deleteBtn.dataset.id;
                const taskToArchive = localTasksCache.find(t => t.id === taskId);
                 showGenericDeleteConfirmation({
                    itemType: 'task',
                    onConfirm: () => {
                        if (taskToArchive) archiveItem('Task', taskToArchive);
                    }
                });
            }
            const editBtn = e.target.closest('.edit-task-btn');
            if (editBtn) {
                 const taskId = editBtn.dataset.id;
                 showEditTaskModal(taskId);
            }
        });

        contentArea.addEventListener('dragstart', e => {
            if (e.target.classList.contains('task-card')) {
                draggedTaskId = e.target.dataset.id;
                e.target.classList.add('dragging');
            }
        });

        contentArea.addEventListener('dragend', e => {
            if (e.target.classList.contains('task-card')) {
                e.target.classList.remove('dragging');
                draggedTaskId = null;
            }
        });

        taskLists.forEach(list => {
            list.addEventListener('dragover', e => {
                e.preventDefault();
                list.classList.add('drag-over');
            });
            list.addEventListener('dragleave', () => list.classList.remove('drag-over'));
            list.addEventListener('drop', async e => {
                e.preventDefault();
                list.classList.remove('drag-over');
                if (draggedTaskId) {
                    const newStatus = list.dataset.status;
                    const taskDocRef = doc(db, `artifacts/${appId}/users/${userId}/tasks`, draggedTaskId);
                    await updateDoc(taskDocRef, { status: newStatus });
                }
            });
        });
    };

    const showEditTaskModal = async (taskId) => {
        if (!userId) return;
        const taskDocRef = doc(db, `artifacts/${appId}/users/${userId}/tasks`, taskId);
        const taskSnap = await getDoc(taskDocRef);
        if (!taskSnap.exists()) return;
        const task = taskSnap.data();

        const modalHTML = `
            <div class="modal-overlay" id="edit-modal-overlay">
                <div class="modal-content">
                    <h3 class="text-xl font-bold mb-4">Edit Task</h3>
                    <form id="edit-task-form" class="space-y-4">
                        <div>
                            <label for="edit-task-text" class="block text-sm font-medium text-primary">Task Description</label>
                            <textarea id="edit-task-text" name="task-text" rows="9" required class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary"></textarea>
                        </div>
                        <div>
                            <label for="edit-task-assigned" class="block text-sm font-medium text-primary">Assign To</label>
                            <input type="text" id="edit-task-assigned" name="task-assigned" required class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                        </div>
                        <div>
                            <label for="edit-task-due" class="block text-sm font-medium text-primary">Due Date</label>
                            <input type="text" id="edit-task-due" name="task-due" required placeholder="Select Date..." class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                        </div>
                        <div class="flex justify-end gap-4">
                            <button type="button" id="cancel-edit-btn" class="py-2 px-4 rounded-md bg-secondary text-primary">Cancel</button>
                            <button type="submit" class="py-2 px-4 rounded-md bg-accent text-white">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        modalContainer.innerHTML = modalHTML;
        
        document.getElementById('edit-task-text').value = task.text;
        document.getElementById('edit-task-assigned').value = task.assignedTo;
        
        flatpickr("#edit-task-due", {
            dateFormat: "Y-m-d",
            defaultDate: task.dueDate,
            minDate: "today"
        });

        document.getElementById('edit-task-form').onsubmit = async (e) => {
            e.preventDefault();
            const form = e.target;
            await updateDoc(taskDocRef, {
                text: sanitizeHTML(form['task-text'].value),
                assignedTo: sanitizeHTML(form['task-assigned'].value),
                dueDate: form['task-due'].value
            });
            modalContainer.innerHTML = '';
        };

        document.getElementById('cancel-edit-btn').onclick = () => modalContainer.innerHTML = '';
        document.getElementById('edit-modal-overlay').onclick = (e) => {
            if (e.target.id === 'edit-modal-overlay') modalContainer.innerHTML = '';
        };
    };


    const renderSynchrosContent = () => {
        // This function is now just a template renderer
        return `
            <div id="synchro-page-container">
                <div class="mb-8 p-6 border border-primary rounded-lg bg-primary">
                    <h3 class="text-xl font-semibold mb-4 text-primary">Add New Meeting Note</h3>
                    <form id="synchro-form" class="space-y-4">
                        <div>
                            <label for="synchro-type" class="block text-sm font-medium text-primary">Meeting Type</label>
                            <select id="synchro-type" name="synchro-type" class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                                <option>SYNCHROS</option>
                                <option>COLECTIVAS</option>
                                <option>COMMON BACKLOG</option>
                                <option>RELAYS / RUNBOYS</option>
                                <option>SYNCHROS ITALY/PORTUGAL</option>
                            </select>
                        </div>
                        <div>
                             <label for="synchro-date" class="block text-sm font-medium text-primary">Date</label>
                             <input type="text" id="synchro-date" name="synchro-date" required placeholder="Select Date..." class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                        </div>
                        <div>
                            <label for="synchro-info" class="block text-sm font-medium text-primary">Information</label>
                            <textarea id="synchro-info" name="synchro-info" rows="12" required class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary"></textarea>
                        </div>
                        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">Add Note</button>
                    </form>
                </div>

                <div>
                    <h3 class="text-xl font-semibold mb-4 text-primary">Meeting Notes</h3>
                    <div class="flex flex-col md:flex-row gap-4 mb-4">
                        <div class="w-full md:w-1/3">
                            <label for="synchro-type-filter" class="sr-only">Filter by Type</label>
                             <select id="synchro-type-filter" class="w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                                <option value="">All Meeting Types</option>
                                <option>SYNCHROS</option>
                                <option>COLECTIVAS</option>
                                <option>COMMON BACKLOG</option>
                                <option>RELAYS / RUNBOYS</option>
                                <option>SYNCHROS ITALY/PORTUGAL</option>
                            </select>
                        </div>
                        <div class="w-full md:w-1/3">
                            <label for="synchro-date-filter" class="sr-only">Filter by Date</label>
                            <input type="text" id="synchro-date-filter" placeholder="Filter by date range..." class="w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                        </div>
                         <div class="w-full md:w-1/3">
                            <label for="synchro-search" class="sr-only">Search</label>
                            <input type="text" id="synchro-search" class="w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary" placeholder="Search in content...">
                        </div>
                    </div>
                    <div id="synchro-list" class="space-y-4">
                        <!-- Notes will be rendered here -->
                    </div>
                </div>
            </div>
        `;
    };

    const initializeSynchrosPage = () => {
        if (!userId) return;
        
        const form = document.getElementById('synchro-form');
        const searchInput = document.getElementById('synchro-search');
        const typeFilter = document.getElementById('synchro-type-filter');
        const dateFilterInput = document.getElementById('synchro-date-filter');
        const listContainer = document.getElementById('synchro-list');
        let localNotesCache = [];
        const synchrosCollection = collection(db, `artifacts/${appId}/users/${userId}/synchros`);

        const addFormDatepicker = flatpickr("#synchro-date", {
            dateFormat: "Y-m-d",
            defaultDate: "today"
        });
        const filterFormDatepicker = flatpickr(dateFilterInput, {
            mode: "range",
            dateFormat: "Y-m-d",
            onChange: () => filterNotes()
        });

        const renderNotes = (notes) => {
            listContainer.innerHTML = '';
            if (notes.length === 0) {
                listContainer.innerHTML = '<p class="text-secondary text-center">No meeting notes found for the selected criteria.</p>';
                return;
            }

            notes.sort((a, b) => new Date(b.date) - new Date(a.date));

            notes.forEach(note => {
                const noteCard = document.createElement('div');
                noteCard.className = 'synchro-card p-4 bg-primary rounded-lg border border-primary';
                noteCard.innerHTML = `
                    <div class="flex justify-between items-start">
                        <div>
                            <p class="font-bold text-accent">${sanitizeHTML(note.type)}</p>
                            <p class="text-sm text-secondary">${note.date}</p>
                        </div>
                        <div class="card-actions">
                             <button class="edit-synchro-btn p-1 rounded-md bg-edit text-white" data-id="${note.id}">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z"></path></svg>
                            </button>
                            <button class="delete-synchro-btn p-1 rounded-md bg-danger text-white" data-id="${note.id}">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </div>
                    </div>
                    <p class="mt-2 text-primary whitespace-pre-wrap">${sanitizeHTML(note.info)}</p>
                `;
                listContainer.appendChild(noteCard);
            });
        };

        const filterNotes = () => {
             const searchTerm = searchInput.value.toLowerCase();
             const typeValue = typeFilter.value;
             const selectedDates = filterFormDatepicker.selectedDates;
             
             const filtered = localNotesCache.filter(note => {
                const textMatch = note.info.toLowerCase().includes(searchTerm);
                const typeMatch = !typeValue || note.type === typeValue;
                
                let dateMatch = true;
                if (selectedDates.length === 2) {
                    const noteDate = new Date(note.date);
                    const startDate = selectedDates[0];
                    startDate.setHours(0,0,0,0);
                    const endDate = selectedDates[1];
                    endDate.setHours(23,59,59,999);
                    dateMatch = noteDate >= startDate && noteDate <= endDate;
                }

                return textMatch && typeMatch && dateMatch;
             });
             renderNotes(filtered);
        };
        
        const unsubscribe = onSnapshot(synchrosCollection, (snapshot) => {
            localNotesCache = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            filterNotes();
        });
        unsubscribes.push(unsubscribe);

        form.addEventListener('submit', async e => {
            e.preventDefault();
            const formData = new FormData(form);
            await addDoc(synchrosCollection, {
                type: sanitizeHTML(formData.get('synchro-type')),
                date: formData.get('synchro-date'),
                info: sanitizeHTML(formData.get('synchro-info')),
                createdAt: new Date()
            });
            form.reset();
            addFormDatepicker.setDate(new Date(), true);
        });

        listContainer.addEventListener('click', e => {
            const deleteBtn = e.target.closest('.delete-synchro-btn');
            if (deleteBtn) {
                const noteId = deleteBtn.dataset.id;
                const noteToArchive = localNotesCache.find(n => n.id === noteId);
                showGenericDeleteConfirmation({
                    itemType: 'note',
                    onConfirm: () => {
                        if(noteToArchive) archiveItem('Synchro', noteToArchive);
                    }
                });
            }
             const editBtn = e.target.closest('.edit-synchro-btn');
            if (editBtn) {
                 const noteId = editBtn.dataset.id;
                 showEditSynchroModal(noteId);
            }
        });
        
        searchInput.addEventListener('keyup', filterNotes);
        typeFilter.addEventListener('change', filterNotes);
    };

    const showEditSynchroModal = async (noteId) => {
        if (!userId) return;
        const noteDocRef = doc(db, `artifacts/${appId}/users/${userId}/synchros`, noteId);
        const noteSnap = await getDoc(noteDocRef);
        if (!noteSnap.exists()) return;
        const note = noteSnap.data();

        const modalHTML = `
            <div class="modal-overlay" id="edit-modal-overlay">
                <div class="modal-content">
                    <h3 class="text-xl font-bold mb-4">Edit Note</h3>
                    <form id="edit-synchro-form" class="space-y-4">
                        <div>
                            <label for="edit-synchro-type" class="block text-sm font-medium text-primary">Meeting Type</label>
                            <select id="edit-synchro-type" name="synchro-type" class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                                <option>SYNCHROS</option>
                                <option>COLECTIVAS</option>
                                <option>COMMON BACKLOG</option>
                                <option>RELAYS / RUNBOYS</option>
                                <option>SYNCHROS ITALY/PORTUGAL</option>
                            </select>
                        </div>
                        <div>
                             <label for="edit-synchro-date" class="block text-sm font-medium text-primary">Date</label>
                             <input type="text" id="edit-synchro-date" name="synchro-date" required placeholder="Select Date..." class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                        </div>
                        <div>
                            <label for="edit-synchro-info" class="block text-sm font-medium text-primary">Information</label>
                            <textarea id="edit-synchro-info" name="synchro-info" rows="12" required class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary"></textarea>
                        </div>
                        <div class="flex justify-end gap-4">
                            <button type="button" id="cancel-edit-btn" class="py-2 px-4 rounded-md bg-secondary text-primary">Cancel</button>
                            <button type="submit" class="py-2 px-4 rounded-md bg-accent text-white">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        modalContainer.innerHTML = modalHTML;

        document.getElementById('edit-synchro-type').value = note.type;
        document.getElementById('edit-synchro-info').value = note.info;
        flatpickr("#edit-synchro-date", {
            dateFormat: "Y-m-d",
            defaultDate: note.date
        });


        document.getElementById('edit-synchro-form').onsubmit = async (e) => {
            e.preventDefault();
            const form = e.target;
            await updateDoc(noteDocRef, {
                type: sanitizeHTML(form['synchro-type'].value),
                date: form['synchro-date'].value,
                info: sanitizeHTML(form['synchro-info'].value)
            });
            modalContainer.innerHTML = '';
        };

        document.getElementById('cancel-edit-btn').onclick = () => modalContainer.innerHTML = '';
        document.getElementById('edit-modal-overlay').onclick = (e) => {
            if (e.target.id === 'edit-modal-overlay') modalContainer.innerHTML = '';
        };
    };

    const renderKnownIssuesContent = () => {
        return `
            <div id="known-issues-page-container">
                <div class="mb-8 p-6 border border-primary rounded-lg bg-primary">
                    <h3 class="text-xl font-semibold mb-4 text-primary">Log a New Issue</h3>
                    <form id="issue-form" class="space-y-4">
                        <div>
                            <label for="issue-title" class="block text-sm font-medium text-primary">Title</label>
                            <input type="text" id="issue-title" name="issue-title" required class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                        </div>
                        <div>
                             <label for="issue-date" class="block text-sm font-medium text-primary">Date</label>
                             <input type="text" id="issue-date" name="issue-date" required placeholder="Select Date..." class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                        </div>
                        <div>
                            <label for="issue-description" class="block text-sm font-medium text-primary">Description</label>
                            <textarea id="issue-description" name="issue-description" rows="9" required class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary"></textarea>
                        </div>
                        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">Add Issue</button>
                    </form>
                </div>
                <div>
                    <h3 class="text-xl font-semibold mb-4 text-primary">Logged Issues</h3>
                    <input type="text" id="issue-search" class="w-full p-2 border border-primary rounded-md mb-4 focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary" placeholder="Search by title or description...">
                    <div id="issue-list" class="space-y-4"></div>
                </div>
            </div>
        `;
    };

    const initializeKnownIssuesPage = () => {
        if (!userId) return;
        const form = document.getElementById('issue-form');
        const searchInput = document.getElementById('issue-search');
        const listContainer = document.getElementById('issue-list');
        let localIssuesCache = [];
        const issuesCollection = collection(db, `artifacts/${appId}/users/${userId}/known-issues`);

        flatpickr("#issue-date", {
            dateFormat: "Y-m-d",
            defaultDate: "today"
        });

        const renderIssues = (issues) => {
            listContainer.innerHTML = '';
             if (issues.length === 0) {
                listContainer.innerHTML = '<p class="text-secondary text-center">No issues logged yet.</p>';
                return;
            }

            issues.sort((a, b) => new Date(b.date) - new Date(a.date));

            issues.forEach(issue => {
                const issueCard = document.createElement('div');
                issueCard.className = 'known-issue-card p-4 bg-primary rounded-lg border border-primary';
                const statusClass = issue.status === 'Solved' ? 'status-solved' : 'status-inprogress';
                const closureDateHTML = issue.status === 'Solved' && issue.closureDate 
                    ? `<p class="text-sm text-secondary mt-1">Closed on: ${issue.closureDate}</p>` 
                    : '';

                issueCard.innerHTML = `
                    <div class="flex justify-between items-start">
                        <div>
                            <h4 class="font-bold text-lg text-primary">${sanitizeHTML(issue.title)}</h4>
                            <p class="text-sm text-secondary">${issue.date}</p>
                             ${closureDateHTML}
                        </div>
                        <div class="flex items-center gap-4">
                             <span class="status-badge ${statusClass}">${issue.status}</span>
                             <div class="card-actions">
                                 <button class="toggle-status-btn py-1 px-2 text-sm rounded-md bg-secondary text-primary" data-id="${issue.id}">Toggle Status</button>
                                 <button class="edit-issue-btn p-1 rounded-md bg-edit text-white" data-id="${issue.id}">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z"></path></svg>
                                </button>
                                <button class="delete-issue-btn p-1 rounded-md bg-danger text-white" data-id="${issue.id}">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <p class="mt-2 text-primary whitespace-pre-wrap">${sanitizeHTML(issue.description)}</p>
                `;
                listContainer.appendChild(issueCard);
            });
        };
        
        const unsubscribe = onSnapshot(issuesCollection, snapshot => {
            localIssuesCache = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            renderIssues(localIssuesCache);
        });
        unsubscribes.push(unsubscribe);

        form.addEventListener('submit', async e => {
            e.preventDefault();
            const formData = new FormData(form);
            await addDoc(issuesCollection, {
                title: sanitizeHTML(formData.get('issue-title')),
                date: formData.get('issue-date'),
                description: sanitizeHTML(formData.get('issue-description')),
                status: 'In Progress',
                closureDate: null
            });
            form.reset();
             flatpickr("#issue-date", {
                dateFormat: "Y-m-d",
                defaultDate: "today"
            });
        });
        
        searchInput.addEventListener('keyup', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filtered = localIssuesCache.filter(issue => 
                issue.title.toLowerCase().includes(searchTerm) || 
                issue.description.toLowerCase().includes(searchTerm)
            );
            renderIssues(filtered);
        });

         listContainer.addEventListener('click', async e => {
            const deleteBtn = e.target.closest('.delete-issue-btn');
            if (deleteBtn) {
                const issueId = deleteBtn.dataset.id;
                const issueToArchive = localIssuesCache.find(i => i.id === issueId);
                showGenericDeleteConfirmation({
                    itemType: 'issue',
                    onConfirm: () => {
                        if(issueToArchive) archiveItem('Known Issue', issueToArchive);
                    }
                });
            }
            const editBtn = e.target.closest('.edit-issue-btn');
            if(editBtn) {
                const issueId = editBtn.dataset.id;
                showEditIssueModal(issueId);
            }
            const toggleBtn = e.target.closest('.toggle-status-btn');
            if(toggleBtn) {
                 const issueId = toggleBtn.dataset.id;
                 const issueToToggle = localIssuesCache.find(i => i.id === issueId);
                 if (issueToToggle) {
                     const newStatus = issueToToggle.status === 'In Progress' ? 'Solved' : 'In Progress';
                     const newClosureDate = newStatus === 'Solved' ? new Date().toISOString().split('T')[0] : null;
                     const issueDocRef = doc(db, `artifacts/${appId}/users/${userId}/known-issues`, issueId);
                     await updateDoc(issueDocRef, {
                         status: newStatus,
                         closureDate: newClosureDate
                     });
                 }
            }
        });
    };

    const showEditIssueModal = async (issueId) => {
        if(!userId) return;
        const issueDocRef = doc(db, `artifacts/${appId}/users/${userId}/known-issues`, issueId);
        const issueSnap = await getDoc(issueDocRef);
        if(!issueSnap.exists()) return;
        const issue = issueSnap.data();

         const modalHTML = `
            <div class="modal-overlay" id="edit-modal-overlay">
                <div class="modal-content">
                    <h3 class="text-xl font-bold mb-4">Edit Issue</h3>
                    <form id="edit-issue-form" class="space-y-4">
                        <div>
                            <label for="edit-issue-title" class="block text-sm font-medium text-primary">Title</label>
                            <input type="text" id="edit-issue-title" name="issue-title" required class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                        </div>
                        <div>
                             <label for="edit-issue-date" class="block text-sm font-medium text-primary">Date</label>
                             <input type="text" id="edit-issue-date" name="issue-date" required placeholder="Select Date..." class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                        </div>
                        <div>
                            <label for="edit-issue-description" class="block text-sm font-medium text-primary">Description</label>
                            <textarea id="edit-issue-description" name="issue-description" rows="9" required class="mt-1 block w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary"></textarea>
                        </div>
                        <div class="flex justify-end gap-4">
                            <button type="button" id="cancel-edit-btn" class="py-2 px-4 rounded-md bg-secondary text-primary">Cancel</button>
                            <button type="submit" class="py-2 px-4 rounded-md bg-accent text-white">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        modalContainer.innerHTML = modalHTML;

        document.getElementById('edit-issue-title').value = issue.title;
        document.getElementById('edit-issue-description').value = issue.description;
        flatpickr("#edit-issue-date", { dateFormat: "Y-m-d", defaultDate: issue.date });

        document.getElementById('edit-issue-form').onsubmit = async (e) => {
            e.preventDefault();
            const form = e.target;
            await updateDoc(issueDocRef, {
                title: sanitizeHTML(form['issue-title'].value),
                date: form['issue-date'].value,
                description: sanitizeHTML(form['issue-description'].value)
            });
            modalContainer.innerHTML = '';
        };

        document.getElementById('cancel-edit-btn').onclick = () => modalContainer.innerHTML = '';
        document.getElementById('edit-modal-overlay').onclick = (e) => {
            if (e.target.id === 'edit-modal-overlay') modalContainer.innerHTML = '';
        };
    };

    const renderDutysContent = () => {
        return `
            <div id="dutys-page-container">
                <div class="mb-8 p-6 border border-primary rounded-lg bg-primary">
                    <h3 class="text-xl font-semibold mb-4 text-primary">Log a New Duty</h3>
                    <form id="duty-form" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="duty-name" class="block text-sm font-medium text-primary">Name</label>
                            <input type="text" id="duty-name" name="name" required class="mt-1 block w-full p-2 border border-primary rounded-md bg-secondary text-primary">
                        </div>
                        <div>
                            <label for="duty-date" class="block text-sm font-medium text-primary">Date</label>
                            <input type="text" id="duty-date" name="date" required placeholder="Select Date..." class="mt-1 block w-full p-2 border border-primary rounded-md bg-secondary text-primary">
                        </div>
                        <div>
                            <label for="duty-link" class="block text-sm font-medium text-primary">Duty (Link)</label>
                            <input type="url" id="duty-link" name="dutyLink" placeholder="https://..." class="mt-1 block w-full p-2 border border-primary rounded-md bg-secondary text-primary">
                        </div>
                        <div>
                            <label for="duty-ticket" class="block text-sm font-medium text-primary">Ticket Opened (Link)</label>
                            <input type="url" id="duty-ticket" name="ticketLink" placeholder="https://..." class="mt-1 block w-full p-2 border border-primary rounded-md bg-secondary text-primary">
                        </div>
                        <div class="md:col-span-2">
                            <label for="duty-reason" class="block text-sm font-medium text-primary">Reason for Duty</label>
                            <textarea id="duty-reason" name="reason" rows="4" class="mt-1 block w-full p-2 border border-primary rounded-md bg-secondary text-primary"></textarea>
                        </div>
                        <div>
                            <label for="duty-resolved-by" class="block text-sm font-medium text-primary">Resolved By</label>
                            <input type="text" id="duty-resolved-by" name="resolvedBy" class="mt-1 block w-full p-2 border border-primary rounded-md bg-secondary text-primary">
                        </div>
                        <div>
                            <label for="duty-opened-correctly" class="block text-sm font-medium text-primary">Opened Correctly?</label>
                            <select id="duty-opened-correctly" name="openedCorrectly" class="mt-1 block w-full p-2 border border-primary rounded-md bg-secondary text-primary">
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                         <div class="md:col-span-2">
                            <label for="duty-resolution" class="block text-sm font-medium text-primary">Resolution</label>
                            <textarea id="duty-resolution" name="resolution" rows="4" class="mt-1 block w-full p-2 border border-primary rounded-md bg-secondary text-primary"></textarea>
                        </div>
                        <div class="md:col-span-2">
                            <label for="duty-comments" class="block text-sm font-medium text-primary">Comments</label>
                            <textarea id="duty-comments" name="comments" rows="4" class="mt-1 block w-full p-2 border border-primary rounded-md bg-secondary text-primary"></textarea>
                        </div>
                        <div class="md:col-span-2">
                            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-accent hover:opacity-90">Add Duty Log</button>
                        </div>
                    </form>
                </div>
                <div>
                    <h3 class="text-xl font-semibold mb-4 text-primary">Duty Logs</h3>
                    <input type="text" id="duty-search" class="w-full p-2 border border-primary rounded-md mb-4 focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary" placeholder="Search all fields...">
                    <div class="overflow-x-auto rounded-lg border border-primary">
                        <table id="duty-table" class="min-w-full bg-secondary">
                            <thead>
                                <tr class="bg-primary">
                                    <th class="py-3 px-4 text-left font-semibold text-secondary uppercase text-sm">Name</th>
                                    <th class="py-3 px-4 text-left font-semibold text-secondary uppercase text-sm">Date</th>
                                    <th class="py-3 px-4 text-left font-semibold text-secondary uppercase text-sm">Duty</th>
                                    <th class="py-3 px-4 text-left font-semibold text-secondary uppercase text-sm">Ticket</th>
                                    <th class="py-3 px-4 text-left font-semibold text-secondary uppercase text-sm">Reason</th>
                                    <th class="py-3 px-4 text-left font-semibold text-secondary uppercase text-sm">Resolved By</th>
                                    <th class="py-3 px-4 text-left font-semibold text-secondary uppercase text-sm">Resolution</th>
                                    <th class="py-3 px-4 text-left font-semibold text-secondary uppercase text-sm">Opened Correctly?</th>
                                    <th class="py-3 px-4 text-left font-semibold text-secondary uppercase text-sm">Comments</th>
                                    <th class="py-3 px-4 text-right font-semibold text-secondary uppercase text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    };

    const initializeDutysPage = () => {
        if (!userId) return;
        const form = document.getElementById('duty-form');
        const searchInput = document.getElementById('duty-search');
        const tableBody = document.querySelector('#duty-table tbody');
        let localDutysCache = [];
        const dutysCollection = collection(db, `artifacts/${appId}/users/${userId}/dutys`);

        flatpickr("#duty-date", { dateFormat: "Y-m-d", defaultDate: "today" });

        const renderDutys = (dutys) => {
            tableBody.innerHTML = '';
            
            dutys.sort((a,b) => new Date(b.date) - new Date(a.date));

            dutys.forEach(duty => {
                const row = document.createElement('tr');
                row.className = 'hover:bg-primary';
                
                row.innerHTML = `
                    <td class="py-3 px-4 border-b border-primary text-primary">${sanitizeHTML(duty.name)}</td>
                    <td class="py-3 px-4 border-b border-primary text-primary">${duty.date}</td>
                    <td class="py-3 px-4 border-b border-primary text-primary"><a href="${duty.dutyLink}" target="_blank" rel="noopener noreferrer">${duty.dutyLink ? 'Link' : ''}</a></td>
                    <td class="py-3 px-4 border-b border-primary text-primary"><a href="${duty.ticketLink}" target="_blank" rel="noopener noreferrer">${duty.ticketLink ? 'Link' : ''}</a></td>
                    <td class="py-3 px-4 border-b border-primary text-primary">${sanitizeHTML(duty.reason)}</td>
                    <td class="py-3 px-4 border-b border-primary text-primary">${sanitizeHTML(duty.resolvedBy)}</td>
                    <td class="py-3 px-4 border-b border-primary text-primary">${sanitizeHTML(duty.resolution)}</td>
                    <td class="py-3 px-4 border-b border-primary text-primary">${duty.openedCorrectly}</td>
                    <td class="py-3 px-4 border-b border-primary text-primary">${sanitizeHTML(duty.comments)}</td>
                    <td class="py-3 px-4 border-b border-primary text-right">
                        <div class="actions-wrapper justify-end">
                            <button class="edit-duty-btn p-1 rounded-md bg-edit text-white" data-id="${duty.id}"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L14.732 3.732z"></path></svg></button>
                            <button class="delete-duty-btn p-1 rounded-md bg-danger text-white" data-id="${duty.id}"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                        </div>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        };
        
        const unsubscribe = onSnapshot(dutysCollection, snapshot => {
            localDutysCache = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            renderDutys(localDutysCache);
        });
        unsubscribes.push(unsubscribe);

        form.addEventListener('submit', async e => {
            e.preventDefault();
            const formData = new FormData(form);
            const newDuty = {};
            for(let [key, value] of formData.entries()) {
                newDuty[key] = sanitizeHTML(value);
            }
            newDuty.createdAt = new Date();
            await addDoc(dutysCollection, newDuty);
            form.reset();
            flatpickr("#duty-date", { dateFormat: "Y-m-d", defaultDate: "today" });
        });

        searchInput.addEventListener('keyup', () => {
             const searchTerm = searchInput.value.toLowerCase();
             const filtered = localDutysCache.filter(duty => Object.values(duty).some(val => String(val).toLowerCase().includes(searchTerm)));
             renderDutys(filtered);
        });

        tableBody.addEventListener('click', e => {
            const deleteBtn = e.target.closest('.delete-duty-btn');
            if (deleteBtn) {
                const dutyId = deleteBtn.dataset.id;
                const dutyToArchive = localDutysCache.find(d => d.id === dutyId);
                showGenericDeleteConfirmation({
                    itemType: 'duty log',
                    onConfirm: () => {
                        if(dutyToArchive) archiveItem('Duty', dutyToArchive);
                    }
                });
            }
            const editBtn = e.target.closest('.edit-duty-btn');
            if(editBtn) {
                const dutyId = editBtn.dataset.id;
                showEditDutyModal(dutyId);
            }
        });
    };

    const showEditDutyModal = async (dutyId) => {
        if(!userId) return;
        const dutyDocRef = doc(db, `artifacts/${appId}/users/${userId}/dutys`, dutyId);
        const dutySnap = await getDoc(dutyDocRef);
        if(!dutySnap.exists()) return;
        const duty = dutySnap.data();
        
        const modalHTML = `
            <div class="modal-overlay" id="edit-modal-overlay">
                <div class="modal-content">
                    <h3 class="text-xl font-bold mb-4">Edit Duty Log</h3>
                    <form id="edit-duty-form" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label for="edit-duty-name" class="block text-sm font-medium text-primary">Name</label>
                            <input type="text" id="edit-duty-name" name="name" required class="mt-1 block w-full p-2 border border-primary rounded-md bg-secondary text-primary">
                        </div>
                        <div>
                            <label for="edit-duty-date" class="block text-sm font-medium text-primary">Date</label>
                            <input type="text" id="edit-duty-date" name="date" required placeholder="Select Date..." class="mt-1 block w-full p-2 border border-primary rounded-md bg-secondary text-primary">
                        </div>
                        <div>
                            <label for="edit-duty-link" class="block text-sm font-medium text-primary">Duty (Link)</label>
                            <input type="url" id="edit-duty-link" name="dutyLink" placeholder="https://..." class="mt-1 block w-full p-2 border border-primary rounded-md bg-secondary text-primary">
                        </div>
                        <div>
                            <label for="edit-duty-ticket" class="block text-sm font-medium text-primary">Ticket Opened (Link)</label>
                            <input type="url" id="edit-duty-ticket" name="ticketLink" placeholder="https://..." class="mt-1 block w-full p-2 border border-primary rounded-md bg-secondary text-primary">
                        </div>
                        <div class="md:col-span-2">
                            <label for="edit-duty-reason" class="block text-sm font-medium text-primary">Reason for Duty</label>
                            <textarea id="edit-duty-reason" name="reason" rows="4" class="mt-1 block w-full p-2 border border-primary rounded-md bg-secondary text-primary"></textarea>
                        </div>
                        <div>
                            <label for="edit-duty-resolved-by" class="block text-sm font-medium text-primary">Resolved By</label>
                            <input type="text" id="edit-duty-resolved-by" name="resolvedBy" class="mt-1 block w-full p-2 border border-primary rounded-md bg-secondary text-primary">
                        </div>
                        <div>
                            <label for="edit-duty-opened-correctly" class="block text-sm font-medium text-primary">Opened Correctly?</label>
                            <select id="edit-duty-opened-correctly" name="openedCorrectly" class="mt-1 block w-full p-2 border border-primary rounded-md bg-secondary text-primary">
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </div>
                         <div class="md:col-span-2">
                            <label for="edit-duty-resolution" class="block text-sm font-medium text-primary">Resolution</label>
                            <textarea id="edit-duty-resolution" name="resolution" rows="4" class="mt-1 block w-full p-2 border border-primary rounded-md bg-secondary text-primary"></textarea>
                        </div>
                        <div class="md:col-span-2">
                            <label for="edit-duty-comments" class="block text-sm font-medium text-primary">Comments</label>
                            <textarea id="edit-duty-comments" name="comments" rows="4" class="mt-1 block w-full p-2 border border-primary rounded-md bg-secondary text-primary"></textarea>
                        </div>
                        <div class="md:col-span-2 flex justify-end gap-4">
                            <button type="button" id="cancel-edit-btn" class="py-2 px-4 rounded-md bg-secondary text-primary">Cancel</button>
                            <button type="submit" class="py-2 px-4 rounded-md bg-accent text-white">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        modalContainer.innerHTML = modalHTML;
        
        // Populate form
        const form = document.getElementById('edit-duty-form');
        for(const key in duty) {
            if(form.elements[key]) {
                form.elements[key].value = duty[key];
            }
        }
        flatpickr("#edit-duty-date", { dateFormat: "Y-m-d", defaultDate: duty.date });

        form.onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const updatedDuty = {};
            for(let [key, value] of formData.entries()) {
                updatedDuty[key] = sanitizeHTML(value);
            }
            await updateDoc(dutyDocRef, updatedDuty);
            modalContainer.innerHTML = '';
        };

        document.getElementById('cancel-edit-btn').onclick = () => modalContainer.innerHTML = '';
        document.getElementById('edit-modal-overlay').onclick = (e) => {
            if (e.target.id === 'edit-modal-overlay') modalContainer.innerHTML = '';
        };
    };

    const renderArchivedContent = () => {
       return `
            <div id="archived-page-container">
                 <div class="flex flex-col md:flex-row gap-4 mb-4 p-4 border border-primary rounded-lg bg-primary">
                    <div class="w-full md:w-1/3">
                        <label for="archive-type-filter" class="sr-only">Filter by Type</label>
                         <select id="archive-type-filter" class="w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                            <option value="">All Item Types</option>
                            <option>Ticket</option>
                            <option>Task</option>
                            <option>Synchro</option>
                            <option>Known Issue</option>
                            <option>Duty</option>
                        </select>
                    </div>
                    <div class="w-full md:w-1/3">
                        <label for="archive-date-filter" class="sr-only">Filter by Date</label>
                        <input type="text" id="archive-date-filter" placeholder="Filter by archived date range..." class="w-full p-2 border border-primary rounded-md focus:ring-2 focus:ring-accent focus:border-accent bg-secondary text-primary">
                    </div>
                     <div class="w-full md:w-1/3 flex justify-end">
                        <button id="permanent-delete-btn" class="py-2 px-4 rounded-md bg-danger text-white" disabled>Delete Selected</button>
                    </div>
                </div>
                <div class="overflow-x-auto rounded-lg border border-primary">
                    <table id="archive-table" class="min-w-full bg-secondary">
                        <thead>
                            <tr class="bg-primary">
                                <th class="py-3 px-4 text-left"><input type="checkbox" id="select-all-archive"></th>
                                <th class="py-3 px-4 text-left font-semibold text-secondary uppercase text-sm">Type</th>
                                <th class="py-3 px-4 text-left font-semibold text-secondary uppercase text-sm">Content</th>
                                <th class="py-3 px-4 text-left font-semibold text-secondary uppercase text-sm">Archived Date</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
       `;
    };

    const initializeArchivedPage = () => {
        if (!userId) return;
        const typeFilter = document.getElementById('archive-type-filter');
        const dateFilter = document.getElementById('archive-date-filter');
        const deleteBtn = document.getElementById('permanent-delete-btn');
        const tableBody = document.querySelector('#archive-table tbody');
        const selectAllCheckbox = document.getElementById('select-all-archive');
        let localArchiveCache = [];
        const archiveCollection = collection(db, `artifacts/${appId}/users/${userId}/archivedItems`);

        const datePicker = flatpickr(dateFilter, {
            mode: "range",
            dateFormat: "Y-m-d",
            onChange: () => filterAndRenderArchive()
        });

        const getSummary = (item) => {
            switch(item.archivedFrom) {
                case 'Ticket': return `[${item.category}] ${item.problem}`;
                case 'Task': return `[${item.assignedTo}] ${item.text}`;
                case 'Synchro': return `[${item.type}] ${item.info}`;
                case 'Known Issue': return `[${item.status}] ${item.title}`;
                case 'Duty': return `[${item.name}] ${item.reason}`;
                default: return 'Unknown item';
            }
        };

        const renderArchive = (items) => {
            tableBody.innerHTML = '';
            if (items.length === 0) {
                 tableBody.innerHTML = '<tr><td colspan="4" class="text-center text-secondary p-4">The archive is empty.</td></tr>';
                 return;
            }
            
            items.sort((a,b) => new Date(b.archivedDate) - new Date(a.archivedDate));
            
            items.forEach(item => {
                const row = document.createElement('tr');
                row.className = 'hover:bg-primary';
                const summary = sanitizeHTML(getSummary(item));
                const truncatedSummary = summary.length > 100 ? summary.substring(0, 100) + '...' : summary;

                row.innerHTML = `
                    <td class="py-3 px-4 border-b border-primary text-primary"><input type="checkbox" class="archive-item-checkbox" data-id="${item.id}"></td>
                    <td class="py-3 px-4 border-b border-primary text-primary">${item.archivedFrom}</td>
                    <td class="py-3 px-4 border-b border-primary text-primary" title="${summary}">${truncatedSummary}</td>
                    <td class="py-3 px-4 border-b border-primary text-primary">${item.archivedDate}</td>
                `;
                tableBody.appendChild(row);
            });
        };

        const filterAndRenderArchive = () => {
            const typeValue = typeFilter.value;
            const selectedDates = datePicker.selectedDates;

            const filtered = localArchiveCache.filter(item => {
                const typeMatch = !typeValue || item.archivedFrom === typeValue;
                let dateMatch = true;
                if(selectedDates.length === 2) {
                    const itemDate = new Date(item.archivedDate);
                    const startDate = selectedDates[0];
                    startDate.setHours(0,0,0,0);
                    const endDate = selectedDates[1];
                    endDate.setHours(23,59,59,999);
                    dateMatch = itemDate >= startDate && itemDate <= endDate;
                }
                return typeMatch && dateMatch;
            });
            renderArchive(filtered);
        };
        
        const unsubscribe = onSnapshot(archiveCollection, snapshot => {
            localArchiveCache = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
            filterAndRenderArchive();
        });
        unsubscribes.push(unsubscribe);

        const updateDeleteButtonState = () => {
            const selected = tableBody.querySelectorAll('.archive-item-checkbox:checked');
            deleteBtn.disabled = selected.length === 0;
        };

        tableBody.addEventListener('change', e => {
            if (e.target.classList.contains('archive-item-checkbox')) {
                updateDeleteButtonState();
            }
        });
        
        selectAllCheckbox.addEventListener('change', e => {
            const checkboxes = tableBody.querySelectorAll('.archive-item-checkbox');
            checkboxes.forEach(cb => cb.checked = e.target.checked);
            updateDeleteButtonState();
        });

        typeFilter.addEventListener('change', filterAndRenderArchive);

        deleteBtn.addEventListener('click', () => {
            const selectedIds = [...tableBody.querySelectorAll('.archive-item-checkbox:checked')].map(cb => cb.dataset.id);
            if(selectedIds.length > 0) {
                 showGenericDeleteConfirmation({
                    itemType: 'item',
                    permanent: true,
                    onConfirm: async () => {
                        for (const id of selectedIds) {
                            const itemDocRef = doc(db, `artifacts/${appId}/users/${userId}/archivedItems`, id);
                            await deleteDoc(itemDocRef);
                        }
                    }
                });
            }
        });
    };


    // --- THEME ---
    const applyTheme = async (isDark) => {
        document.documentElement.classList.toggle('dark', isDark);
        document.documentElement.classList.toggle('light', !isDark);
        document.getElementById('theme-toggle').checked = isDark;
        if (userId) {
            const settingsDocRef = doc(db, `artifacts/${appId}/users/${userId}/settings/theme`);
            try {
                await setDoc(settingsDocRef, { isDark: isDark });
            } catch (e) {
                console.error("Could not save theme preference:", e);
            }
        }
    };
    
    document.getElementById('theme-toggle').addEventListener('change', (e) => applyTheme(e.target.checked));


    // --- KEYBOARD SHORTCUTS ---

    const showShortcutsModal = () => {
        const shortcuts = [
            { key: '?', description: 'Show this help menu' },
            { key: 'Esc', description: 'Close any open modal or dialog' },
            { key: '1 - 9', description: 'Navigate to sidebar items by position' }
        ];

        const modalHTML = `
            <div class="modal-overlay" id="shortcuts-modal-overlay">
                <div class="modal-content">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-xl font-bold">Keyboard Shortcuts</h3>
                        <button id="close-shortcuts-btn" class="text-2xl leading-none p-1 rounded-full hover:bg-hover-secondary">&times;</button>
                    </div>
                    <ul class="space-y-2">
                        ${shortcuts.map(sc => `
                            <li class="flex items-center justify-between p-2 rounded-md bg-primary">
                                <span class="text-secondary">${sc.description}</span>
                                <kbd class="px-2 py-1 text-sm font-semibold text-primary bg-secondary rounded-md border border-primary">${sc.key}</kbd>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
        modalContainer.innerHTML = modalHTML;

        const closeModal = () => modalContainer.innerHTML = '';
        document.getElementById('close-shortcuts-btn').onclick = closeModal;
        document.getElementById('shortcuts-modal-overlay').onclick = (e) => {
            if (e.target.id === 'shortcuts-modal-overlay') closeModal();
        };
    };

    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') {
            if (e.key === 'Escape') {
                 modalContainer.innerHTML = '';
            }
            return;
        }

        switch(e.key) {
            case '?':
                if (e.shiftKey) {
                    e.preventDefault();
                    showShortcutsModal();
                }
                break;
            case 'Escape':
                modalContainer.innerHTML = '';
                if (window.innerWidth < 1024 && !sidebar.classList.contains('-translate-x-full')) {
                    sidebar.classList.add('-translate-x-full');
                }
                break;
            default:
                if (e.key >= '1' && e.key <= '9') {
                    const navLinks = document.querySelectorAll('#nav-menu .nav-link');
                    const index = parseInt(e.key) - 1;
                    if (navLinks.length > index && navLinks[index]) {
                        navLinks[index].click();
                    }
                }
                break;
        }
    });

    // --- APPLICATION START ---
    const startApp = async (user) => {
        userId = user.uid;

        // Load theme preference
        const settingsDocRef = doc(db, `artifacts/${appId}/users/${userId}/settings/theme`);
        const themeSnap = await getDoc(settingsDocRef);
        let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches; // Default
        if (themeSnap.exists()) {
            isDark = themeSnap.data().isDark;
        }
        applyTheme(isDark);
        
        // Setup navigation
        navMenu.innerHTML = ''; // Clear any previous state
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

        window.addEventListener('click', (e) => {
            if (!e.target.closest('[id^="dropdown-btn-"]')) {
                 document.querySelectorAll('[id^="dropdown-content-"]').forEach(content => content.classList.add('hidden'));
                document.querySelectorAll('[id^="dropdown-btn-"] svg').forEach(svg => svg.classList.remove('rotate-180'));
            }
        });
        
        // Initial render
        renderContent('home');
        
        // Hide loading overlay
        const appContainer = document.getElementById('app-container');
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                if(appContainer) appContainer.classList.add('loaded');
            }, 300);
        } else if(appContainer) {
            appContainer.classList.add('loaded');
        }
    }

    window.firebase.onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in.
            startApp(user);
        } else {
            // User is signed out. Attempt to sign in.
            try {
                if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                    await window.firebase.signInWithCustomToken(auth, __initial_auth_token);
                } else {
                    await window.firebase.signInAnonymously(auth);
                }
                // The onAuthStateChanged listener will be called again with the new user state.
            } catch (error) {
                console.error("Authentication failed:", error);
                // Handle auth failure (e.g., show an error message).
            }
        }
    });

});



