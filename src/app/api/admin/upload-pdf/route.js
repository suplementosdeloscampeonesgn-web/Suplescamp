import { NextRequest, NextResponse } from 'next/server';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const usuarioId = formData.get('usuarioId');
    const tipoPlan = formData.get('tipoPlan');
    const titulo = formData.get('titulo');

    // Validaciones
    if (!file || !usuarioId || !tipoPlan || !titulo) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Solo se permiten archivos PDF' }, { status: 400 });
    }

    // Crear nombre único para el archivo en Firebase
    const timestamp = Date.now();
    const fileName = `planes/${tipoPlan}/${usuarioId}/${timestamp}_${file.name}`;
    
    // Subir a Firebase Storage
    const storageRef = ref(storage, fileName);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    console.log('Subiendo archivo a Firebase...');
    const snapshot = await uploadBytes(storageRef, buffer, {
      contentType: 'application/pdf'
    });

    const downloadURL = await getDownloadURL(snapshot.ref);

    // Guardar en base de datos usando Prisma
    console.log('Guardando en base de datos...');
    const asesoria = await prisma.asesoria.create({
      data: {
        userId: usuarioId,
        title: titulo,
        tipo: tipoPlan,
        pdfUrl: downloadURL, // URL de Firebase Storage
        filename: file.name,
        createdAt: new Date()
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'PDF subido exitosamente a Firebase',
      asesoria,
      downloadURL 
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error.message 
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
