import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  plan: {
    type: String,
    enum: ['transformation-12weeks'],
    default: 'transformation-12weeks'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  progress: {
    week: { type: Number, default: 1 },
    weight: { type: Number },
    measurements: {
      chest: Number,
      waist: Number,
      arms: Number,
      legs: Number
    },
    photos: [String],
    notes: String
  },
  purchaseInfo: {
    amount: Number,
    paymentDate: Date,
    paymentMethod: String,
    transactionId: String
  }
}, {
  timestamps: true
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
