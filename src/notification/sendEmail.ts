import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

// Verificación de variables de entorno
if (
  !process.env.EMAIL_HOST ||
  !process.env.EMAIL_USER_APP ||
  !process.env.PORTAFOLIO_APP_PASSWORD
) {
  throw new Error(
    "Faltan variables de entorno necesarias para configurar el transporte de correo."
  );
}

// Configuración del transporte
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true,
  auth: {
    user: process.env.EMAIL_USER_APP,
    pass: process.env.PORTAFOLIO_APP_PASSWORD,
  },
});

/**
 *  Función para enviar el correo de recuperación para la recuperacion de contraseñas
 * parametros que recibe un email adonde se enviara el email y la url base para redireccion del usuario
 * @param emailUser
 * @param url
 */

export async function emailNotification(
  customerName: string,
  subject: string,
  customerEmail: string,
  message: string
) {
  try {
    // Cuerpo del correo en texto plano
    const text = `Apreciado Victor Alfonso Alomia Angulo,  
Este mensaje ha sido enviado por el señor ${customerName} a través de tu portafolio.  
Desea que te pongas en contacto con él mediante el siguiente correo electrónico: ${customerEmail}.`;
    // Cuerpo del correo en HTML
    const html = `
      <p>Estimado Victor Alfonso Alomia Angulo,</p>
      <p>${message}</p>
      <p>Este mensaje ha sido enviado por <b>${customerName}</b> a través de tu portafolio.</p>
      <p>Puedes contactarlo a través de su correo electrónico: <b>${customerEmail}</b>.</p>
      <br>
      <p><b>Portafolio Victor - Notificación</b></p>
    `;
    // Enviar el correo
     await transporter.sendMail({
      from: `PORTAFOLIO VICTOR <${process.env.EMAIL_USER_APP}>`,
      to: process.env.USER_EMAIL, // Dirección del receptor
      subject: subject,
      text: text, // Cuerpo en texto plano
      html: html, // Cuerpo en HTML
    });
  } catch (error) {
    console.error("❌ No se pudo enviar el correo. Detalles del error:", error);
  }
}
