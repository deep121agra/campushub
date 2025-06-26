// Materials Collection
const MaterialSchema = new Schema({
  title: String,
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  fileUrl: String,
  uploadedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Material', MaterialSchema);