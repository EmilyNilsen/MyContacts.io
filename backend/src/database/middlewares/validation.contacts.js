const validateTelefone = (req, res, next) => {
  try {
    const { telefone } = req.body;
    const telefoneString = telefone.toString().trim();
    if (telefoneString.length < 11 || telefoneString.length > 11) return res.status(400).json({ message: 'invalid phone number' });
    next();
  } catch(e) {
    console.error(e);
  }
}

module.exports = {
  validateTelefone
}
