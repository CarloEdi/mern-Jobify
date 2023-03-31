import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import attachCookie from '../utils/attachCookie.js'



const register = async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password) {
        throw new BadRequestError('Please provide all values')
    }
    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists) {
        throw new BadRequestError('A user with this email already exists')
    }
    const user = await User.create({name, email, password})
    const token = user.createJWT()

    attachCookie({ res, token })

    res.status(StatusCodes.CREATED).json({
        user: {
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            location: user.location,
        },
        location: user.location
    })
    
}

const login = async (req, res) => {
    const { email, password } = req.body
    if( !email || !password ) {
        throw new BadRequestError('Please provide all values')
    }
    const user = await User.findOne({ email }).select('+password')
   if(!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const passwordMatches = await user.comparePassword(password)
    if(!passwordMatches) {
        throw new UnauthenticatedError('Invalid Credentials')
    }
    const token = user.createJWT()
    
    user.password = undefined

    attachCookie({ res, token })

    res.status(StatusCodes.OK).json({
        user,
        location: user.location
    })
}

const updateUser = async (req, res) => {
    const { name, lastName, email, location } = req.body
    if( !name || !lastName || !email || !location ) {
        throw new BadRequestError('Please provide all values')
    }
    const userId = req.user.userId
    const user = await User.findOne({ _id: userId })

    user.name = name,
    user.lastName = lastName,
    user.email = email,
    user.location = location

    await user.save()

    const token = user.createJWT()

    attachCookie({ res, token })

    res.status(StatusCodes.OK).json({ user, location: user.location })
}

const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId })
    res.status(StatusCodes.OK).json({ user , location: user.location})
} 

const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    }) 
    res.status(StatusCodes.OK).json({ msg: 'Logout Successful!'})
}

export {register, login, updateUser, getCurrentUser, logout}