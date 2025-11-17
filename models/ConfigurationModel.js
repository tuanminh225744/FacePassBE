// ConfigurationModel.js
import mongoose from 'mongoose';

const ConfigurationSchema = new mongoose.Schema({
    settingName: { 
        type: String, 
        required: true, 
        unique: true 
    },
    settingValue: { 
        type: mongoose.Schema.Types.Mixed, 
        required: true 
    }, // Cho phép lưu String, Number, Object, etc.
    description: { 
        type: String 
    }
}, { timestamps: true });

export default mongoose.model('Configuration', ConfigurationSchema);