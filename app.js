/* app.js */

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } 
from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, updateDoc, doc, deleteDoc } 
from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBmVlFuDlyJy484MOVNdClEsXhDzx9EMU8",
    authDomain: "tickets-79166.firebaseapp.com",
    projectId: "tickets-79166",
    storageBucket: "tickets-79166.firebasestorage.app",
    messagingSenderId: "559863475280",
    appId: "1:559863475280:web:800b1680ae11d9434fb555",
    measurementId: "G-D677EPJJ6H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Configurar persistencia de sesión
setPersistence(auth, browserLocalPersistence)
    .then(() => {
        console.log("Persistencia configurada en local.");
    })
    .catch((error) => {
        console.error("Error en persistencia:", error);
    });

// Eventos de autenticación
document.addEventListener("DOMContentLoaded", () => {
    const btnLogin = document.getElementById("btnLogin");
    const btnRegister = document.getElementById("btnRegister");
    const btnGoogle = document.getElementById("btnGoogle");
    const btnLogout = document.getElementById("btnLogout");
    const btnCrearTicket = document.getElementById("btnCrearTicket");
    const btnNuevoTicket = document.getElementById("btnNuevoTicket");

    if (btnLogin) {
        btnLogin.addEventListener("click", async () => {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
    
            try {
                await setPersistence(auth, browserSessionPersistence);
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("Usuario autenticado:", userCredential.user);
                window.location.href = "dashboard.html";
            } catch (error) {
                console.error("Error al iniciar sesión:", error);
                alert("Error al iniciar sesión: " + error.message);
            }
        });
    }

    if (btnRegister) {
        btnRegister.addEventListener("click", async () => {
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;
            
            if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                alert("Por favor, ingresa un correo válido.");
                return;
            }

            if (password.length < 6) {
                alert("La contraseña debe tener al menos 6 caracteres.");
                return;
            }
            
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    email: user.email,
                    fechaRegistro: serverTimestamp()
                });
                alert("Registro exitoso. Ahora inicia sesión.");
            } catch (error) {
                alert("Error al registrarse: " + error.message);
            }
        });
    }

    if (btnGoogle) {
        btnGoogle.addEventListener("click", async () => {
            try {
                const result = await signInWithPopup(auth, provider);
                console.log("Usuario autenticado con Google:", result.user);
                window.location.href = "dashboard.html";
            } catch (error) {
                console.error("Error al iniciar sesión con Google:", error);
                alert("Error al iniciar sesión con Google: " + error.message);
            }
        });
    }

    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            signOut(auth).then(() => {
                window.location.href = "index.html";
            });
        });
    }

    if (btnCrearTicket) {
        btnCrearTicket.addEventListener("click", () => {
            window.location.href = "crear-ticket.html";
        });
    }

    if (btnNuevoTicket) {
        btnNuevoTicket.addEventListener("click", () => {
            window.location.href = "crear-ticket.html";
        });
    }
    
    if (btnCrearTicket) {
        btnCrearTicket.addEventListener("click", async () => {
            const titulo = document.getElementById("titulo").value.trim();
            const descripcion = document.getElementById("descripcion").value.trim();
            const prioridad = document.getElementById("prioridad").value;
            const user = auth.currentUser;

            console.log("Intentando crear ticket con datos:", { titulo, descripcion, prioridad, user });

            if (!user) {
                alert("Debes iniciar sesión para crear un ticket.");
                return;
            }

            if (titulo === "" || descripcion === "") {
                alert("Por favor, completa todos los campos.");
                return;
            }

            try {
                await addDoc(collection(db, "tickets"), {
                    titulo,
                    descripcion,
                    prioridad,
                    estado: "abierto",
                    usuario: user.uid,
                    fechaCreacion: serverTimestamp()
                });

                alert("¡Ticket creado exitosamente!");
                window.location.href = "tickets.html";
            } catch (error) {
                console.error("Error al guardar en Firestore:", error);
                alert("Error al crear ticket: " + error.message);
            }
        });
    }

    const ticketList = document.getElementById("ticketList");
    if (ticketList) {
        onSnapshot(collection(db, "tickets"), (snapshot) => {
            ticketList.innerHTML = "";
            snapshot.forEach((doc) => {
                const ticket = doc.data();
                ticketList.innerHTML += `
                    <tr>
                        <td>${ticket.titulo}</td>
                        <td>${ticket.prioridad}</td>
                        <td>${ticket.estado}</td>
                        <td>
                            <button onclick="actualizarEstado('${doc.id}', 'en progreso')" class="btn btn-warning btn-sm">En Progreso</button>
                            <button onclick="actualizarEstado('${doc.id}', 'cerrado')" class="btn btn-success btn-sm">Cerrar</button>
                            <button onclick="eliminarTicket('${doc.id}')" class="btn btn-danger btn-sm">Eliminar</button>
                        </td>
                    </tr>`;
            });
            setTimeout(async () => {
                try {
                    await addDoc(collection(db, "tickets"), {
                        titulo,
                        descripcion,
                        prioridad,
                        estado: "abierto",
                        usuario: user.uid,
                        fechaCreacion: serverTimestamp()
                    });

                    alert("¡Ticket creado exitosamente!");
                    window.location.href = "tickets.html";
                } catch (error) {
                    console.error("Error al guardar en Firestore:", error);
                    alert("Error al crear ticket: " + error.message);
                }
            }, 500);
        });
    }
});

window.actualizarEstado = async (id, estado) => {
    try {
        await updateDoc(doc(db, "tickets", id), { estado });
        alert("Estado actualizado a " + estado);
    } catch (error) {
        alert("Error al actualizar estado: " + error.message);
    }
};

window.eliminarTicket = async (id) => {
    try {
        await deleteDoc(doc(db, "tickets", id));
        alert("Ticket eliminado exitosamente.");
    } catch (error) {
        alert("Error al eliminar ticket: " + error.message);
    }
};
