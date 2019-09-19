import express from 'express';
import User from '../models/user_model';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/users', async (req, res) => {
    // create a new user
    try{
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch(error){
        res.status(400).send(error);
    }
});

/*
message.save()
.then(msg => res.status(200).send())
.catch(err=>console.log(err))

*/

router.post('/users/login', async (req, res)=>{
    // login a registered user
    try{
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        // console.log(user);
        if(!user){
            return res.status(401).send({error: 'Login failed! Check authentication credentials'});
        }
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch(error){
        res.status(400).send(error);
    }
});

router.get('/users/me', auth, async(req, res)=>{
    // View logged in user profile
    res.send(req.user);
});


router.post('/users/me/logout', auth, async(req, res)=>{
    // Log user out of the application
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token
        });
        await req.user.save();
        res.send();
    }catch(error){
        res.status(500).send(error);
    }
});

router.post('users/me/logoutall', auth, async(req, res)=>{
    // Log user out of all devices
    try{
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.send();
    }catch(error){
        res.status(500).send(error);
    }
});

export default router;