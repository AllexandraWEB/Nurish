import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (req, res) => {
  try {
    console.log('=== IMAGE UPLOAD REQUEST ===');
    console.log('Request body exists:', !!req.body);
    console.log('Image data exists:', !!req.body.image);
    
    if (!req.body.image) {
      console.log('❌ No image data provided');
      return res.status(400).json({ message: 'No image data provided' });
    }

    console.log('Image data length:', req.body.image.length);
    console.log('Image data prefix:', req.body.image.substring(0, 50));

    // Upload image to Cloudinary
    console.log('Uploading to Cloudinary...');
    const result = await cloudinary.uploader.upload(req.body.image, {
      folder: 'nurish-recipes',
      resource_type: 'auto',
    });

    console.log('✓ Upload successful!');
    console.log('URL:', result.secure_url);
    console.log('Public ID:', result.public_id);

    res.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error('❌ Upload error:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Failed to upload image',
      error: error.message 
    });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;
    
    if (!publicId) {
      return res.status(400).json({ message: 'No public ID provided' });
    }

    await cloudinary.uploader.destroy(publicId);
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Failed to delete image' });
  }
};