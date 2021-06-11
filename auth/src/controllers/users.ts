import User from '../models/user';
import asyncHandler from 'express-async-handler';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    // TODO: throw an error when user exist
    if (existingUser) {
      // throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  } catch (error) {}
});

const getUser = () => {};

const getUsers = () => {};

export { createUser, getUser, getUsers };
