// Menu mobile toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animation du bouton hamburger
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Fermer le menu quand on clique sur un lien
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Animation au scroll pour les éléments
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les cartes et blocs de service
    const animatedElements = document.querySelectorAll('.formule-card, .service-block, .formation-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#mentions') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Gestion du wizard de dépannage sur la landing page
    const depannageWizard = document.getElementById('depannage-wizard');
    if (depannageWizard) {
        // S'assurer que seules les étapes non-actives sont cachées au chargement
        const allSteps = document.querySelectorAll('.wizard-step');
        allSteps.forEach(step => {
            if (!step.classList.contains('active')) {
                step.style.display = 'none';
            }
        });

        let selectedAppareil = '';
        let selectedType = '';

        // Étape 1: Clic sur le bouton initial
        const btnInit = document.getElementById('btn-init');
        if (btnInit) {
            btnInit.addEventListener('click', function() {
                showStep(2);
            });
        }

        // Étape 2: Choix du type d'appareil
        const btnChoicesAppareil = document.querySelectorAll('#step-2 .btn-choice');
        btnChoicesAppareil.forEach(btn => {
            btn.addEventListener('click', function() {
                selectedAppareil = this.getAttribute('data-value');
                showStep(3);
            });
        });

        // Étape 3: Choix matériel/logiciel
        const btnChoicesType = document.querySelectorAll('#step-3 .btn-choice');
        btnChoicesType.forEach(btn => {
            btn.addEventListener('click', function() {
                selectedType = this.getAttribute('data-value');
                showStep(4);
                
                // Pré-remplir les champs cachés et le message
                const appareilField = document.getElementById('appareil');
                const typeProblemeField = document.getElementById('type_probleme');
                const messageField = document.getElementById('message');
                
                if (appareilField) appareilField.value = selectedAppareil;
                if (typeProblemeField) typeProblemeField.value = selectedType;
                if (messageField) {
                    messageField.value = `Type d'appareil : ${selectedAppareil}\nType de problème : ${selectedType}`;
                }
            });
        });

        // Étape 4: Gestion du créneau horaire
        const creneauRadios = document.querySelectorAll('input[name="creneau"]');
        creneauRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                const messageField = document.getElementById('message');
                if (messageField) {
                    // Reconstruire le message avec le créneau
                    let messageContent = `Type d'appareil : ${selectedAppareil}\nType de problème : ${selectedType}`;
                    if (this.checked) {
                        messageContent += `\nCréneau horaire souhaité : ${this.value}`;
                    }
                    messageField.value = messageContent;
                }
            });
        });

        // Étape 4: Soumission du formulaire
        const depannageForm = document.getElementById('depannage-form');
        if (depannageForm) {
            depannageForm.addEventListener('submit', function(e) {
                // S'assurer que les champs sont bien remplis avant soumission
                const appareilField = document.getElementById('appareil');
                const typeProblemeField = document.getElementById('type_probleme');
                const messageField = document.getElementById('message');
                
                if (appareilField) appareilField.value = selectedAppareil;
                if (typeProblemeField) typeProblemeField.value = selectedType;
                
                // Construire le message avec toutes les informations
                let messageContent = `Type d'appareil : ${selectedAppareil}\nType de problème : ${selectedType}`;
                
                // Ajouter le créneau horaire au message si sélectionné
                const creneauRadio = document.querySelector('input[name="creneau"]:checked');
                if (creneauRadio) {
                    messageContent += `\nCréneau horaire souhaité : ${creneauRadio.value}`;
                }
                
                if (messageField) {
                    messageField.value = messageContent;
                }
                
                // Le formulaire se soumet normalement
            });
        }

        function showStep(stepNumber) {
            // Cacher toutes les étapes
            const allSteps = document.querySelectorAll('.wizard-step');
            allSteps.forEach(step => {
                step.classList.remove('active');
                step.style.display = 'none';
            });

            // Afficher l'étape demandée
            const targetStep = document.getElementById(`step-${stepNumber}`);
            if (targetStep) {
                targetStep.classList.add('active');
                targetStep.style.display = 'block';
            }
        }
    }

    // Gestion des messages du formulaire de contact
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const error = urlParams.get('error');
    const formMessage = document.getElementById('form-message');

    if (formMessage) {
        if (success === '1') {
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.';
            formMessage.style.display = 'block';
            
            // Scroll vers le message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Nettoyer l'URL
            window.history.replaceState({}, document.title, window.location.pathname);
        } else if (error) {
            formMessage.className = 'form-message error';
            formMessage.textContent = decodeURIComponent(error);
            formMessage.style.display = 'block';
            
            // Scroll vers le message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Nettoyer l'URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
});

