class QuickNotes {
    constructor() {
        this.notes = [];
        this.filteredNotes = [];
        this.currentFilter = 'all';
        this.currentPriority = 'high';
        this.currentCategory = 'general';
        this.searchQuery = '';
        this.stats = {
            total: 0,
            today: 0,
            completed: 0
        };
        
        this.noteInput = document.getElementById('noteInput');
        this.addBtn = document.getElementById('addBtn');
        this.notesContainer = document.getElementById('notesContainer');
        this.searchInput = document.getElementById('searchInput');
        this.clearSearchBtn = document.getElementById('clearSearch');
        
        // Meta controls
        this.priorityBtn = document.getElementById('priorityBtn');
        this.voiceBtn = document.getElementById('voiceBtn');
        
        // Stats elements
        this.notesCount = document.getElementById('notesCount');
        this.totalNotes = document.getElementById('totalNotes');
        this.todayNotes = document.getElementById('todayNotes');
        this.completedNotes = document.getElementById('completedNotes');
        this.autoSaveIndicator = document.getElementById('autoSaveIndicator');
        
        this.init();
    }

    init() {
        this.loadNotes();
        this.bindEvents();
        this.render();
        this.updateStats();
        this.setupAnimations();
        this.initGoogleSearch();
        this.initNotesToggle();
        this.initShortcuts();
        if (this.noteInput) {
            this.noteInput.focus();
        }
    }

    // Notes Panel Toggle Functionality
    initNotesToggle() {
        const toggleBtn = document.getElementById('notesToggleBtn');
        const notesPanel = document.querySelector('.notes-panel');
        const newtabPanel = document.querySelector('.newtab-panel');
        
        if (toggleBtn && notesPanel && newtabPanel) {
            // Load saved state
            const isHidden = localStorage.getItem('notesPanel_hidden') === 'true';
            if (isHidden) {
                this.hideNotesPanel();
            }

            // Toggle button click event
            toggleBtn.addEventListener('click', () => {
                this.toggleNotesPanel();
            });

            // Keyboard shortcut (Ctrl/Cmd + N)
            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                    e.preventDefault();
                    this.toggleNotesPanel();
                }
            });
        }
    }

    toggleNotesPanel() {
        const notesPanel = document.querySelector('.notes-panel');
        const isHidden = notesPanel.classList.contains('hidden');
        
        if (isHidden) {
            this.showNotesPanel();
        } else {
            this.hideNotesPanel();
        }
    }

    hideNotesPanel() {
        const toggleBtn = document.getElementById('notesToggleBtn');
        const notesPanel = document.querySelector('.notes-panel');
        const newtabPanel = document.querySelector('.newtab-panel');
        
        // Add hidden classes with animation
        notesPanel.classList.add('hidden');
        newtabPanel.classList.add('expanded');
        toggleBtn.classList.add('notes-hidden');
        
        // Update button text and icon
        const toggleText = toggleBtn.querySelector('.toggle-text');
        if (toggleText) {
            toggleText.textContent = 'Notes';
        }
        
        // Save state
        localStorage.setItem('notesPanel_hidden', 'true');
        
        // Add subtle animation without notification
        this.animateToggleButton(toggleBtn);
    }

    showNotesPanel() {
        const toggleBtn = document.getElementById('notesToggleBtn');
        const notesPanel = document.querySelector('.notes-panel');
        const newtabPanel = document.querySelector('.newtab-panel');
        
        // Remove hidden classes with animation
        notesPanel.classList.remove('hidden');
        newtabPanel.classList.remove('expanded');
        toggleBtn.classList.remove('notes-hidden');
        
        // Update button text
        const toggleText = toggleBtn.querySelector('.toggle-text');
        if (toggleText) {
            toggleText.textContent = 'Notes';
        }
        
        // Save state
        localStorage.setItem('notesPanel_hidden', 'false');
        
        // Add subtle animation without notification
        this.animateToggleButton(toggleBtn);
    }

    animateToggleButton(button) {
        // Add a subtle pulse animation only
        button.style.transform = 'scale(1.1) translateY(-2px)';
        button.style.boxShadow = '0 8px 25px rgba(66, 133, 244, 0.4)';
        
        setTimeout(() => {
            button.style.transform = '';
            button.style.boxShadow = '';
        }, 200);
    }


    // Google Search Enhancement
    initGoogleSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchSuggestions = document.getElementById('searchSuggestions');
        const googleSearchBtn = document.getElementById('googleSearchBtn');
        const feelingLuckyBtn = document.getElementById('feelingLuckyBtn');
        const voiceSearchBtn = document.querySelector('.voice-search');
        const cameraSearchBtn = document.querySelector('.camera-search');

        if (searchInput) {
            // Google logo animation on load
            this.animateGoogleLogo();

            // Search input events
            searchInput.addEventListener('input', (e) => this.handleSearchInput(e));
            searchInput.addEventListener('focus', () => this.showSearchSuggestions());
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.performGoogleSearch(searchInput.value);
                }
            });

            // Click outside to hide suggestions
            document.addEventListener('click', (e) => {
                if (!searchInput.contains(e.target) && !searchSuggestions?.contains(e.target)) {
                    this.hideSearchSuggestions();
                }
            });
        }

        // Button events
        if (googleSearchBtn) {
            googleSearchBtn.addEventListener('click', () => {
                this.performGoogleSearch(searchInput?.value || '');
            });
        }

        if (feelingLuckyBtn) {
            feelingLuckyBtn.addEventListener('click', () => {
                this.performLuckySearch(searchInput?.value || '');
            });
        }

        if (voiceSearchBtn) {
            voiceSearchBtn.addEventListener('click', () => this.handleVoiceSearch());
        }

        if (cameraSearchBtn) {
            cameraSearchBtn.addEventListener('click', () => this.handleImageSearch());
        }

        // Suggestion clicks
        if (searchSuggestions) {
            searchSuggestions.addEventListener('click', (e) => {
                const suggestionItem = e.target.closest('.suggestion-item');
                if (suggestionItem) {
                    const suggestionText = suggestionItem.querySelector('.suggestion-text').textContent;
                    searchInput.value = suggestionText;
                    this.performGoogleSearch(suggestionText);
                }
            });
        }
    }

    animateGoogleLogo() {
        // Animate the Google Doodle elements
        const doodleLetters = document.querySelectorAll('.doodle-letter');
        const floatingElements = document.querySelectorAll('.floating-element');
        const mainEquation = document.querySelector('.main-equation');
        
        // Staggered animation for doodle letters
        doodleLetters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.animationPlayState = 'running';
                letter.classList.add('animate-in');
            }, index * 150);
        });
        
        // Animate floating math elements
        setTimeout(() => {
            floatingElements.forEach((element, index) => {
                element.style.animationPlayState = 'running';
                element.style.opacity = '0.7';
            });
        }, 800);
        
        // Show main equation with delay
        setTimeout(() => {
            if (mainEquation) {
                mainEquation.style.animationPlayState = 'running';
            }
        }, 1200);
        
        // Add interactive click effect
        const doodleContainer = document.querySelector('.google-doodle-container');
        if (doodleContainer) {
            doodleContainer.addEventListener('click', () => {
                this.triggerDoodleEffect();
            });
        }
    }
    
    triggerDoodleEffect() {
        // Special click animation for the doodle
        const doodleLetters = document.querySelectorAll('.doodle-letter');
        const floatingElements = document.querySelectorAll('.floating-element');
        
        doodleLetters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.transform = 'scale(1.2) translateY(-15px) rotate(10deg)';
                setTimeout(() => {
                    letter.style.transform = '';
                }, 300);
            }, index * 50);
        });
        
        // Burst effect for floating elements
        floatingElements.forEach((element) => {
            element.style.animation = 'floatAround 0.8s ease-out';
            element.style.color = '#4285f4';
            element.style.opacity = '1';
            
            setTimeout(() => {
                element.style.animation = '';
                element.style.color = '';
                element.style.opacity = '';
            }, 800);
        });
        
        // Show a brief "solving" animation
        this.showQuadraticSolution();
    }
    
    showQuadraticSolution() {
        const mainEquation = document.querySelector('.equation-highlight');
        if (mainEquation) {
            const originalText = mainEquation.textContent;
            const solutions = [
                'ax² + bx + c = 0',
                'x = (-b ± √(b²-4ac))/2a',
                'The Quadratic Formula!'
            ];
            
            let step = 0;
            const interval = setInterval(() => {
                if (step < solutions.length) {
                    mainEquation.textContent = solutions[step];
                    mainEquation.style.color = step === 2 ? '#34a853' : '#1a73e8';
                    step++;
                } else {
                    setTimeout(() => {
                        mainEquation.textContent = originalText;
                        mainEquation.style.color = '';
                    }, 1500);
                    clearInterval(interval);
                }
            }, 1000);
        }
    }

    handleSearchInput(e) {
        const query = e.target.value;
        if (query.length > 0) {
            this.showSearchSuggestions();
            this.updateSearchSuggestions(query);
        } else {
            this.hideSearchSuggestions();
        }
    }

    showSearchSuggestions() {
        const suggestions = document.getElementById('searchSuggestions');
        if (suggestions) {
            suggestions.style.display = 'block';
        }
    }

    hideSearchSuggestions() {
        const suggestions = document.getElementById('searchSuggestions');
        if (suggestions) {
            suggestions.style.display = 'none';
        }
    }

    updateSearchSuggestions(query) {
        const suggestions = document.getElementById('searchSuggestions');
        if (!suggestions) return;

        const mockSuggestions = [
            `${query} search`,
            `${query} meaning`,
            `${query} tutorial`,
            `${query} review`
        ];

        const suggestionItems = suggestions.querySelectorAll('.suggestion-item');
        suggestionItems.forEach((item, index) => {
            if (mockSuggestions[index]) {
                const textSpan = item.querySelector('.suggestion-text');
                if (textSpan) {
                    textSpan.textContent = mockSuggestions[index];
                }
            }
        });
    }

    performGoogleSearch(query) {
        if (!query.trim()) return;
        
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(searchUrl, '_blank');
        this.hideSearchSuggestions();
    }

    performLuckySearch(query) {
        if (!query.trim()) return;
        
        const luckyUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&btnI=1`;
        window.open(luckyUrl, '_blank');
        this.hideSearchSuggestions();
    }

    handleVoiceSearch() {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            const voiceBtn = document.querySelector('.voice-search');
            
            recognition.continuous = false;
            recognition.interimResults = false;
            
            voiceBtn.classList.add('recording');
            
            recognition.onresult = (event) => {
                const searchInput = document.getElementById('searchInput');
                const transcript = event.results[0][0].transcript;
                if (searchInput) {
                    searchInput.value = transcript;
                    this.performGoogleSearch(transcript);
                }
            };
            
            recognition.onend = () => {
                voiceBtn.classList.remove('recording');
            };
            
            recognition.start();
        } else {
            alert('Voice search is not supported in your browser.');
        }
    }

    handleImageSearch() {
        // Open Google Images search
        window.open('https://images.google.com/', '_blank');
    }

    bindEvents() {
        // Main input events
        if (this.addBtn) {
            this.addBtn.addEventListener('click', () => this.addNote());
        }
        
        if (this.noteInput) {
            this.noteInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.addNote();
                }
            });
            
            // Smart suggestions on input
            this.noteInput.addEventListener('input', (e) => {
                this.handleSmartSuggestions(e.target.value);
            });
        }

        // Search functionality
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        if (this.clearSearchBtn) {
            this.clearSearchBtn.addEventListener('click', () => {
                this.clearSearch();
            });
        }

        // Meta control events
        if (this.priorityBtn) {
            this.priorityBtn.addEventListener('click', () => this.cyclePriority());
        }

        if (this.voiceBtn) {
            this.voiceBtn.addEventListener('click', () => this.handleVoiceInput());
        }

        // Priority and category selection
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('priority-btn')) {
                this.selectPriority(e.target.dataset.priority);
            }
            if (e.target.classList.contains('category-btn')) {
                this.selectCategory(e.target.dataset.category);
            }
            if (e.target.classList.contains('filter-btn')) {
                this.setFilter(e.target.dataset.filter);
            }
        });

        // Note actions with event delegation
        if (this.notesContainer) {
            this.notesContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('complete-btn')) {
                    const noteId = e.target.closest('.note-item').getAttribute('data-note-id');
                    if (noteId) {
                        this.completeNote(noteId);
                    }
                }
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'k':
                        e.preventDefault();
                        this.searchInput?.focus();
                        break;
                    case 'n':
                        e.preventDefault();
                        this.noteInput?.focus();
                        break;
                    case '/':
                        e.preventDefault();
                        this.searchInput?.focus();
                        break;
                }
            }
        });
    }

    addNote() {
        const text = this.noteInput.value.trim();
        if (!text) return;

        const note = {
            id: Date.now().toString(),
            text: text,
            priority: this.currentPriority,
            category: this.currentCategory,
            timestamp: new Date().toISOString(),
            completed: false,
            url: this.isUrl(text)
        };

        this.notes.unshift(note);
        this.noteInput.value = '';
        this.saveNotes();
        this.render();
        this.updateStats();
        this.showAutoSaveIndicator();
        this.noteInput.focus();

        // Hide meta controls after adding
        this.hideMetaControls();
    }

    completeNote(noteId) {
        console.log('Completing note:', noteId);
        const noteElement = document.querySelector(`[data-note-id="${noteId}"]`);
        console.log('Found note element:', !!noteElement);
        
        if (noteElement) {
            noteElement.classList.add('completing');
            
            setTimeout(() => {
                this.notes = this.notes.filter(note => note.id !== noteId);
                this.stats.completed++;
                console.log('Notes after filtering:', this.notes.length);
                this.saveNotes();
                this.render();
                this.updateStats();
                this.showAutoSaveIndicator();
            }, 300);
        }
    }

    handleSearch(query) {
        this.searchQuery = query.toLowerCase();
        this.clearSearchBtn.style.display = query ? 'block' : 'none';
        this.render();
    }

    clearSearch() {
        this.searchInput.value = '';
        this.searchQuery = '';
        this.clearSearchBtn.style.display = 'none';
        this.render();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    cyclePriority() {
        const priorities = ['low', 'medium', 'high'];
        const currentIndex = priorities.indexOf(this.currentPriority);
        const nextIndex = (currentIndex + 1) % priorities.length;
        this.currentPriority = priorities[nextIndex];
        
        // Update all priority buttons to reflect the new selection
        const priorityBtns = document.querySelectorAll('.priority-btn');
        priorityBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.priority === this.currentPriority) {
                btn.classList.add('active');
            }
        });
        
        // Show visual feedback
        this.showPriorityChangeNotification(this.currentPriority);
    }
    
    showPriorityChangeNotification(priority) {
        const priorityEmojis = {
            'low': '🟢',
            'medium': '🟡', 
            'high': '🔴'
        };
        
        const notification = document.createElement('div');
        notification.textContent = `${priorityEmojis[priority]} Priority: ${priority.charAt(0).toUpperCase() + priority.slice(1)}`;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(66, 133, 244, 0.9);
            color: white;
            padding: 8px 16px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: 500;
            backdrop-filter: blur(10px);
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            z-index: 1002;
            pointer-events: none;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 1500);
    }

    hideMetaControls() {
        this.metaControls.style.display = 'none';
    }

    selectPriority(priority) {
        this.currentPriority = priority;
        document.querySelectorAll('.priority-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.priority === priority);
        });
    }

    selectCategory(category) {
        this.currentCategory = category;
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
    }

    handleVoiceInput() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                this.voiceBtn.classList.add('recording');
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.noteInput.value = transcript;
                this.noteInput.focus();
            };

            recognition.onend = () => {
                this.voiceBtn.classList.remove('recording');
            };

            recognition.start();
        } else {
            alert('Voice recognition not supported in this browser');
        }
    }

    handleSmartSuggestions(text) {
        // Auto-detect URL and suggest web category
        if (this.isUrl(text)) {
            this.selectCategory('general');
        }
        
        // Auto-detect work-related keywords
        const workKeywords = ['meeting', 'project', 'deadline', 'email', 'call', 'presentation'];
        if (workKeywords.some(keyword => text.toLowerCase().includes(keyword))) {
            this.selectCategory('work');
        }
        
        // Auto-detect urgent keywords
        const urgentKeywords = ['urgent', 'asap', 'important', 'emergency', 'critical'];
        if (urgentKeywords.some(keyword => text.toLowerCase().includes(keyword))) {
            this.selectPriority('high');
            this.selectCategory('urgent');
        }
    }

    getFilteredNotes() {
        let filtered = [...this.notes];

        // Apply search filter
        if (this.searchQuery) {
            filtered = filtered.filter(note => 
                note.text.toLowerCase().includes(this.searchQuery) ||
                note.category.toLowerCase().includes(this.searchQuery)
            );
        }

        // Apply priority filter
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(note => note.priority === this.currentFilter);
        }

        return filtered;
    }

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    }

    getCategoryIcon(category) {
        const icons = {
            general: '📝',
            work: '💼',
            personal: '👤',
            urgent: '🚨'
        };
        return icons[category] || '📝';
    }

    getPriorityClass(priority) {
        return `priority-${priority}`;
    }

    isUrl(text) {
        try {
            new URL(text);
            return true;
        } catch {
            return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(text);
        }
    }

    formatNoteContent(note) {
        if (note.url) {
            return `<span class="note-content url" onclick="window.open('${note.text.startsWith('http') ? note.text : 'https://' + note.text}', '_blank')">${note.text}</span>`;
        }
        return `<span class="note-content">${this.escapeHtml(note.text)}</span>`;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    render() {
        const filteredNotes = this.getFilteredNotes();

        if (filteredNotes.length === 0) {
            const emptyMessage = this.searchQuery ? 
                `No notes found for "${this.searchQuery}"` : 
                'No notes yet. Create your first note!';
            this.notesContainer.innerHTML = `<div class="empty-state">${emptyMessage}</div>`;
            return;
        }

        const notesHtml = filteredNotes.map(note => `
            <div class="note-item" data-note-id="${note.id}">
                <div class="note-meta">
                    <div class="priority-indicator ${this.getPriorityClass(note.priority)}"></div>
                    <div class="note-timestamp">${this.formatTimestamp(note.timestamp)}</div>
                    <div class="note-category">${this.getCategoryIcon(note.category)}</div>
                </div>
                ${this.formatNoteContent(note)}
                <div class="note-actions">
                    <button class="complete-btn" title="Mark as complete">
                        ✓
                    </button>
                </div>
            </div>
        `).join('');

        this.notesContainer.innerHTML = notesHtml;

        // Animate new notes
        setTimeout(() => {
            document.querySelectorAll('.note-item').forEach((item, index) => {
                item.style.animationDelay = `${index * 0.1}s`;
            });
        }, 100);
    }

    updateStats() {
        const now = new Date();
        const today = now.toDateString();
        
        this.stats.total = this.notes.length;
        this.stats.today = this.notes.filter(note => 
            new Date(note.timestamp).toDateString() === today
        ).length;

        // Update UI
        if (this.notesCount) this.notesCount.textContent = this.stats.total;
        if (this.totalNotes) this.totalNotes.textContent = this.stats.total;
        if (this.todayNotes) this.todayNotes.textContent = this.stats.today;
        if (this.completedNotes) this.completedNotes.textContent = this.stats.completed;
    }

    showAutoSaveIndicator() {
        if (this.autoSaveIndicator) {
            this.autoSaveIndicator.style.opacity = '1';
            setTimeout(() => {
                if (this.autoSaveIndicator) {
                    this.autoSaveIndicator.style.opacity = '0.7';
                }
            }, 2000);
        }
    }

    setupAnimations() {
        // Add staggered animations to existing elements
        const elements = document.querySelectorAll('.notes-header, .smart-input-section, .search-filter-bar, .notes-footer');
        elements.forEach((el, index) => {
            el.style.animationDelay = `${index * 0.2}s`;
        });
    }

    saveNotes() {
        try {
            chrome.storage.local.set({ 
                'quickNotes': this.notes,
                'quickNotesStats': this.stats
            });
        } catch (error) {
            localStorage.setItem('quickNotes', JSON.stringify(this.notes));
            localStorage.setItem('quickNotesStats', JSON.stringify(this.stats));
        }
    }

    loadNotes() {
        try {
            chrome.storage.local.get(['quickNotes', 'quickNotesStats'], (result) => {
                this.notes = result.quickNotes || [];
                this.stats = result.quickNotesStats || { total: 0, today: 0, completed: 0 };
                this.render();
                this.updateStats();
            });
        } catch (error) {
            const savedNotes = localStorage.getItem('quickNotes');
            const savedStats = localStorage.getItem('quickNotesStats');
            this.notes = savedNotes ? JSON.parse(savedNotes) : [];
            this.stats = savedStats ? JSON.parse(savedStats) : { total: 0, today: 0, completed: 0 };
        }
    }

    // Shortcuts Management
    initShortcuts() {
        this.loadCustomShortcuts();
        this.bindShortcutEvents();
    }

    bindShortcutEvents() {
        const addShortcutBtn = document.getElementById('addShortcutBtn');
        const modal = document.getElementById('addShortcutModal');
        const closeModal = document.getElementById('closeModal');
        const cancelModal = document.getElementById('cancelModal');
        const saveShortcut = document.getElementById('saveShortcut');
        const popularShortcuts = document.querySelectorAll('.popular-shortcut');

        if (addShortcutBtn) {
            addShortcutBtn.addEventListener('click', () => this.openModal());
        }

        if (closeModal) {
            closeModal.addEventListener('click', () => this.closeModal());
        }

        if (cancelModal) {
            cancelModal.addEventListener('click', () => this.closeModal());
        }

        if (saveShortcut) {
            saveShortcut.addEventListener('click', () => this.saveNewShortcut());
        }

        // Popular shortcuts
        popularShortcuts.forEach(btn => {
            btn.addEventListener('click', () => {
                const name = btn.dataset.name;
                const url = btn.dataset.url;
                document.getElementById('shortcutName').value = name;
                document.getElementById('shortcutUrl').value = url;
            });
        });

        // Close modal on backdrop click
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                this.closeModal();
            }
        });
    }

    openModal() {
        const modal = document.getElementById('addShortcutModal');
        if (modal) {
            modal.classList.add('show');
            // Clear previous inputs
            document.getElementById('shortcutName').value = '';
            document.getElementById('shortcutUrl').value = '';
            // Focus on name input
            setTimeout(() => {
                document.getElementById('shortcutName').focus();
            }, 100);
        }
    }

    closeModal() {
        const modal = document.getElementById('addShortcutModal');
        if (modal) {
            modal.classList.remove('show');
            
            // Reset modal to add mode
            const modalTitle = modal.querySelector('h3');
            const saveBtn = document.getElementById('saveShortcut');
            modalTitle.textContent = 'Add New Shortcut';
            saveBtn.textContent = 'Add Shortcut';
            delete modal.dataset.editingId;
        }
    }

    saveNewShortcut() {
        const modal = document.getElementById('addShortcutModal');
        const name = document.getElementById('shortcutName').value.trim();
        const url = document.getElementById('shortcutUrl').value.trim();
        const editingId = modal.dataset.editingId;

        if (!name || !url) {
            this.showShortcutNotification('Please fill in both name and URL', 'error');
            return;
        }

        // Validate URL
        try {
            new URL(url);
        } catch {
            this.showShortcutNotification('Please enter a valid URL', 'error');
            return;
        }

        if (editingId) {
            // Update existing shortcut
            this.updateCustomShortcut(parseInt(editingId), name, url);
            this.showShortcutNotification(`Updated ${name} shortcut!`, 'success');
        } else {
            // Add new shortcut
            this.addCustomShortcut(name, url);
            this.showShortcutNotification(`Added ${name} shortcut!`, 'success');
        }
        
        this.closeModal();
    }

    addCustomShortcut(name, url) {
        const shortcuts = this.getCustomShortcuts();
        const newShortcut = {
            id: Date.now(),
            name: name,
            url: url,
            icon: this.generateIconFromName(name, url)
        };
        
        shortcuts.push(newShortcut);
        this.saveCustomShortcuts(shortcuts);
        this.renderCustomShortcut(newShortcut);
    }

    updateCustomShortcut(id, name, url) {
        const shortcuts = this.getCustomShortcuts();
        const shortcutIndex = shortcuts.findIndex(s => s.id === id);
        
        if (shortcutIndex !== -1) {
            shortcuts[shortcutIndex] = {
                id: id,
                name: name,
                url: url,
                icon: this.generateIconFromName(name, url)
            };
            
            this.saveCustomShortcuts(shortcuts);
            
            // Remove old element and render updated one
            const oldElement = document.querySelector(`[data-shortcut-id="${id}"]`);
            if (oldElement) {
                oldElement.remove();
            }
            
            this.renderCustomShortcut(shortcuts[shortcutIndex]);
        }
    }

    renderCustomShortcut(shortcut) {
        const shortcutsContainer = document.querySelector('.app-shortcuts');
        const addBtn = document.getElementById('addShortcutBtn');
        
        const shortcutElement = document.createElement('a');
        shortcutElement.href = shortcut.url;
        shortcutElement.className = 'app-shortcut custom-shortcut';
        shortcutElement.dataset.shortcutId = shortcut.id;
        shortcutElement.title = shortcut.name;
        
        shortcutElement.innerHTML = `
            <div class="icon-container">
                <svg viewBox="0 0 24 24" fill="#ffffff">
                    ${shortcut.icon}
                </svg>
            </div>
            <div class="shortcut-menu">
                <button class="menu-trigger" title="More options">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="2"/>
                        <circle cx="12" cy="12" r="2"/>
                        <circle cx="12" cy="19" r="2"/>
                    </svg>
                </button>
                <div class="menu-dropdown">
                    <button class="menu-item edit-shortcut">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                        </svg>
                        Edit
                    </button>
                    <button class="menu-item remove-shortcut">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                        </svg>
                        Delete
                    </button>
                </div>
            </div>
        `;

        // Insert before the add button
        shortcutsContainer.insertBefore(shortcutElement, addBtn);

        // Add menu functionality
        const menuTrigger = shortcutElement.querySelector('.menu-trigger');
        const menuDropdown = shortcutElement.querySelector('.menu-dropdown');
        const editBtn = shortcutElement.querySelector('.edit-shortcut');
        const removeBtn = shortcutElement.querySelector('.remove-shortcut');
        
        // Menu trigger
        menuTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other open menus
            document.querySelectorAll('.menu-dropdown.show').forEach(menu => {
                if (menu !== menuDropdown) {
                    menu.classList.remove('show');
                }
            });
            
            // Toggle current menu
            menuDropdown.classList.toggle('show');
        });
        
        // Edit functionality
        editBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            menuDropdown.classList.remove('show');
            this.editCustomShortcut(shortcut.id);
        });
        
        // Remove functionality
        removeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            menuDropdown.classList.remove('show');
            this.removeCustomShortcut(shortcut.id);
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!shortcutElement.contains(e.target)) {
                menuDropdown.classList.remove('show');
            }
        });
    }

    editCustomShortcut(id) {
        const shortcuts = this.getCustomShortcuts();
        const shortcut = shortcuts.find(s => s.id === parseInt(id));
        
        if (!shortcut) return;
        
        // Open modal with existing data
        const modal = document.getElementById('addShortcutModal');
        const nameInput = document.getElementById('shortcutName');
        const urlInput = document.getElementById('shortcutUrl');
        const saveBtn = document.getElementById('saveShortcut');
        
        if (modal) {
            modal.classList.add('show');
            nameInput.value = shortcut.name;
            urlInput.value = shortcut.url;
            
            // Change modal title and button text
            const modalTitle = modal.querySelector('h3');
            modalTitle.textContent = 'Edit Shortcut';
            saveBtn.textContent = 'Update Shortcut';
            
            // Store the ID for updating
            modal.dataset.editingId = id;
            
            // Focus on name input
            setTimeout(() => {
                nameInput.focus();
                nameInput.select();
            }, 100);
        }
    }

    removeCustomShortcut(id) {
        const shortcuts = this.getCustomShortcuts();
        const updatedShortcuts = shortcuts.filter(s => s.id !== parseInt(id));
        this.saveCustomShortcuts(updatedShortcuts);
        
        const shortcutElement = document.querySelector(`[data-shortcut-id="${id}"]`);
        if (shortcutElement) {
            shortcutElement.remove();
        }
        
        this.showShortcutNotification('Shortcut removed', 'info');
    }

    generateIconFromName(name, url) {
        // Get actual logo for popular websites
        const logo = this.getWebsiteLogo(name.toLowerCase(), url);
        if (logo) {
            return logo;
        }
        
        // Fallback to first letter
        const letter = name.charAt(0).toUpperCase();
        return `<text x="12" y="16" text-anchor="middle" fill="#ffffff" font-size="14" font-weight="bold">${letter}</text>`;
    }

    getWebsiteLogo(name, url) {
        const logos = {
            'chatgpt': `<path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" fill="#74aa9c"/>`,
            'openai': `<path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" fill="#74aa9c"/>`,
            'facebook': `<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>`,
            'twitter': `<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" fill="#1DA1F2"/>`,
            'instagram': `<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="#E4405F"/>`,
            'linkedin': `<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0077B5"/>`,
            'reddit': `<path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" fill="#FF4500"/>`,
            'github': `<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#181717"/>`,
            'youtube': `<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>`,
            'netflix': `<path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.71.002-22.95zM5.398 1.05V24c2.873-.358 5.398-.398 5.398-.398V1.05z" fill="#E50914"/>`,
            'discord': `<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" fill="#7289DA"/>`,
            'twitch': `<path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" fill="#9146FF"/>`,
            'spotify': `<path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" fill="#1DB954"/>`,
            'amazon': `<path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726-1.548.41-3.156.615-4.83.615-2.42 0-4.73-.303-6.926-.91-2.195-.608-4.254-1.494-6.18-2.658-.243-.16-.345-.31-.3-.45.044-.14.18-.196.404-.196.22 0 .542.068.935.204.397.136.808.27 1.235.4zm21.563-3.234c-.734-1.132-1.914-2.09-3.54-2.866-1.627-.777-3.44-1.164-5.44-1.164-.586 0-1.172.035-1.758.105-.586.07-1.157.175-1.713.315-.557.14-1.094.315-1.612.525-.518.21-1.008.455-1.47.735-.237.147-.415.28-.534.402-.12.123-.165.236-.14.34.026.105.11.19.252.255.142.065.32.098.534.098.214 0 .456-.033.726-.098.27-.065.56-.15.87-.255.31-.105.637-.225.98-.36.343-.135.698-.285 1.065-.45.582-.263 1.2-.473 1.854-.63.654-.157 1.33-.235 2.027-.235.697 0 1.377.078 2.04.235.663.157 1.28.383 1.85.68.57.297 1.08.654 1.53 1.07.45.416.802.867 1.056 1.353.127.244.19.473.19.688 0 .214-.063.408-.19.582-.127.174-.3.326-.518.456-.218.13-.456.235-.714.315-.258.08-.52.12-.786.12-.266 0-.518-.04-.756-.12-.238-.08-.45-.2-.636-.36-.186-.16-.334-.36-.444-.6-.11-.24-.165-.51-.165-.81 0-.3.055-.57.165-.81.11-.24.258-.44.444-.6.186-.16.398-.28.636-.36.238-.08.49-.12.756-.12.266 0 .528.04.786.12.258.08.496.185.714.315.218.13.39.282.518.456.127.174.19.368.19.582 0 .215-.063.444-.19.688zm-2.247-.315c-.234-.586-.666-1.074-1.295-1.465-.63-.39-1.35-.585-2.16-.585-.81 0-1.53.195-2.16.585-.63.39-1.061.88-1.295 1.465-.234.585-.351 1.2-.351 1.845 0 .645.117 1.26.351 1.845.234.585.665 1.074 1.295 1.465.63.39 1.35.585 2.16.585.81 0 1.53-.195 2.16-.585.63-.39 1.061-.88 1.295-1.465.234-.585.351-1.2.351-1.845 0-.645-.117-1.26-.351-1.845z" fill="#FF9900"/>`,
            'gmail': `<path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h3.819l6.545 4.91 6.545-4.91h3.819A1.636 1.636 0 0 1 24 5.457z" fill="#EA4335"/>`,
            'microsoft': `<path d="M0 0h11.377v11.372H0zm12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zm12.623 12.623H24V12.623H12.623z" fill="#F25022"/>`,
            'apple': `<path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" fill="#000000"/>`,
            'google': `<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>`,
            'wikipedia': `<path d="M12.17 3.83c-.85-.15-1.72.28-1.87 1.13l-1.45 8.23L5.44 4.1c-.06-.23-.22-.44-.44-.57-.22-.13-.49-.19-.76-.16h-.01c-.27.03-.53.14-.73.31-.2.17-.34.39-.39.64L1.29 12l1.82-7.68c.15-.85-.28-1.72-1.13-1.87-.85-.15-1.72.28-1.87 1.13L.06 3.7c-.14.8.29 1.59 1.09 1.73.8.14 1.59-.29 1.73-1.09l.05-.28 1.82 7.68-1.82 7.68-.05-.28c-.14-.8-.93-1.23-1.73-1.09-.8.14-1.23.93-1.09 1.73l.05.12c.15.85 1.02 1.28 1.87 1.13.85-.15 1.28-1.02 1.13-1.87L1.29 12l1.82 7.68c.05.25.19.47.39.64.2.17.46.28.73.31h.01c.27-.03.54-.03.76-.16.22-.13.38-.34.44-.57l3.41-9.09 1.45 8.23c.15.85 1.02 1.28 1.87 1.13.85-.15 1.28-1.02 1.13-1.87L12.17 3.83z" fill="#000000"/>`,
            'stackoverflow': `<path d="M18.986 21.865v-6.404h2.134V24H1.844v-8.539h2.13v6.404h15.012zM6.111 19.731H16.85v-2.137H6.111v2.137zm.259-4.852l10.48 2.189.451-2.07-10.478-2.187-.453 2.068zm1.359-5.056l9.705 4.53.903-1.95-9.706-4.53-.902 1.95zm2.715-4.785l8.217 6.855 1.359-1.62-8.216-6.853-1.36 1.618zM15.539 0l-1.7 1.265 6.381 8.588 1.7-1.265L15.539 0zM6.369 17.595h10.739v-2.137H6.369v2.137z" fill="#FE7A16"/>`,
            'dropbox': `<path d="M6 2L12 6 6 10l-6-4zm6 0l6 4-6 4-6-4zm-6 16l6-4 6 4-6 4zm12-6l6-4-6-4-6 4z" fill="#0061FF"/>`,
            'paypal': `<path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a.781.781 0 0 1 .084-.39c.188-.49.131-.978-.024-1.414-.562-1.583-2.168-2.425-4.772-2.425H5.998c-.524 0-.968.382-1.05.9L1.841 20.894a.641.641 0 0 0 .633.74h4.606c.524 0 .968-.382 1.05-.9l1.12-7.106c.082-.518.526-.9 1.05-.9h2.19c4.298 0 7.664-1.747 8.647-6.797.03-.149.054-.294.077-.437.054-.327.077-.646.008-.951z" fill="#003087"/>`,
            'ebay': `<path d="M8.292 13.978c-.34.34-.899.34-1.239 0l-4.85-4.85c-.34-.34-.34-.899 0-1.239l4.85-4.85c.34-.34.899-.34 1.239 0 .34.34.34.899 0 1.239L4.42 8.15l3.872 3.872c.34.34.34.899 0 1.239.115-.115.115-.115 0 0z" fill="#E53238"/>`,
        };

        // Check for logo by name
        if (logos[name]) {
            return logos[name];
        }

        // Check if URL contains known domains
        if (url) {
            const domain = this.extractDomain(url);
            for (const [key, logo] of Object.entries(logos)) {
                if (domain.includes(key) || domain.includes(key.replace(/[^a-z]/g, ''))) {
                    return logo;
                }
            }
        }

        return null;
    }

    extractDomain(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.hostname.toLowerCase().replace('www.', '');
        } catch {
            return url.toLowerCase();
        }
    }

    loadCustomShortcuts() {
        const shortcuts = this.getCustomShortcuts();
        shortcuts.forEach(shortcut => {
            this.renderCustomShortcut(shortcut);
        });
    }

    getCustomShortcuts() {
        try {
            return JSON.parse(localStorage.getItem('customShortcuts') || '[]');
        } catch {
            return [];
        }
    }

    saveCustomShortcuts(shortcuts) {
        localStorage.setItem('customShortcuts', JSON.stringify(shortcuts));
    }

    showShortcutNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `shortcut-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${type === 'error' ? 'rgba(244, 67, 54, 0.9)' : type === 'success' ? 'rgba(76, 175, 80, 0.9)' : 'rgba(66, 133, 244, 0.9)'};
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            backdrop-filter: blur(10px);
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            z-index: 1003;
            pointer-events: none;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// No longer needed - QuickNotes class handles all functionality

// Initialize the Quick Notes app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.quickNotes = new QuickNotes();
});

// Handle theme-based styling (optional enhancement)
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-theme');
}
