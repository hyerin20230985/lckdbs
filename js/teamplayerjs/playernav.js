// Toggle selected chip style
(function(){
    const chips = Array.from(document.querySelectorAll('.chip'));
    function normalizeRole(r){
        if(!r) return 'ALL';
        if(r === 'SUPPORT') return 'SUP';
        return r.toUpperCase();
    }
    function updateBodyClass(role){
        if (role && role !== 'ALL') {
            document.body.classList.add('role-filtered');
        } else {
            document.body.classList.remove('role-filtered');
        }
    }
    chips.forEach(btn => btn.addEventListener('click', () => {
        chips.forEach(b => b.setAttribute('aria-pressed','false'));
        btn.setAttribute('aria-pressed','true');
        const role = normalizeRole(btn.getAttribute('data-role'));
        window.currentRole = role; // expose current role
        updateBodyClass(role);
        document.dispatchEvent(new CustomEvent('rolechange', { detail: { role } }));
    }));
    // initialize on load
    const pressed = chips.find(b => b.getAttribute('aria-pressed') === 'true');
    window.currentRole = normalizeRole(pressed ? pressed.getAttribute('data-role') : 'ALL');
    updateBodyClass(window.currentRole);
})();
