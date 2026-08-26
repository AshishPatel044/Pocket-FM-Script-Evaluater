const shows = [
  ['Beggar Husband','Drama'],['Billionaire Hidden Wife','Drama'],['Ek Strranger Se Pyar','Drama'],['Empire of Hidden King','Drama'],['Fated To Be Yours','Drama'],['His Secret Fortune','Drama'],['Malang','Drama'],['My Mysterious Princess','Drama'],['Ruthless','Drama'],
  ['Brahmand Ka Rakshak','Fantasy'],['Brahmyodha  The Destroyer','Fantasy'],['Divine Flame Burst','Fantasy'],['Divine Power','Fantasy'],['King of Dragon','Fantasy'],['Married To a Hard Hearted','Fantasy'],['Primordial God','Fantasy'],['Purple Thunder Sovereign','Fantasy'],['Rudra  Rise of the Supreme Yodha','Fantasy'],['The Legend Gods','Fantasy'],['The Warrior','Fantasy'],['Shiva  Ek Pretyodha','Horror']
].map(([showName, genre]) => ({ showName, genre }))

export default function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ success: false, message: 'Method not allowed' })
  res.status(200).json({ success: true, shows })
}
