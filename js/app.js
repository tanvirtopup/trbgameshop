// Global State
let selectedPackageInfo = { name: '', price: 0 };
let selectedPaymentMethodName = 'wallet';
let currentBalance = 0;

document.addEventListener('DOMContentLoaded', () => {
    initAuthListener();
});

// Monitor Login Status
function initAuthListener() {
    auth.onAuthStateChanged(user => {
        if (user) {
            fetchUserData(user.uid);
        } else {
            updateBalanceUI(0);
        }
    });
}

// Fetch Wallet Balance
function fetchUserData(uid) {
    db.collection('users').doc(uid).onSnapshot(doc => {
        if (doc.exists) {
            currentBalance = doc.data().balance || 0;
            updateBalanceUI(currentBalance);
        }
    });
}

function updateBalanceUI(amount) {
    const el = document.getElementById('walletBalance');
    if (el) el.innerText = `৳ ${amount}`;
}

// Select Topup Package
function selectPackage(element, price, pkgName) {
    document.querySelectorAll('.pkg-box').forEach(card => card.classList.remove('active'));
    element.classList.add('active');
    selectedPackageInfo = { name: pkgName, price: price };
}

// Google Sign In
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(res => {
        alert('সাইন ইন সফল হয়েছে!');
    }).catch(err => {
        alert('লগইন ত্রুটি: ' + err.message);
    });
}

// Place Order
function processOrder() {
    const user = auth.currentUser;
    const playerId = document.getElementById('playerIdInput')?.value.trim();

    if (!user) return alert('অর্ডার করার আগে লগইন করুন!');
    if (!selectedPackageInfo.price) return alert('প্যাকেজ সিলেক্ট করুন!');
    if (!playerId) return alert('Player ID লিখুন!');

    if (currentBalance < selectedPackageInfo.price) {
        return alert('ব্যালেন্স পর্যাপ্ত নয়! ওয়ালেটে টাকা এড করুন।');
    }

    db.collection('orders').add({
        userId: user.uid,
        userEmail: user.email,
        playerId: playerId,
        packageName: selectedPackageInfo.name,
        price: selectedPackageInfo.price,
        status: 'pending',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert('অর্ডার জমা হয়েছে! এডমিন শীঘ্রই কমপ্লিট করবে।');
        location.reload();
    });
}

