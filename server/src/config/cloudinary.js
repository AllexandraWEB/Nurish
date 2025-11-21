import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({ 
    cloud_name: 'drqrc9c8h', 
    api_key: '632542691263694', 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;