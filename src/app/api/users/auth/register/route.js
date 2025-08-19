import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request) {
  try {
    const { name, email, phone, password } = await request.json();

    await connectDB();

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'El usuario ya existe' },
        { status: 400 }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear el usuario
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword
    });

    return NextResponse.json(
      { message: 'Usuario creado exitosamente' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
