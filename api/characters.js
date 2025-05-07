import characters from '../backend/data/players.js'; // Import dat z players.js

export default function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        if (id) {
            const character = characters.find(c => c.id === id);
            if (!character) {
                return res.status(404).json({ error: 'Character not found' });
            }
            return res.status(200).json(character);
        }
        return res.status(200).json(characters);
    }

    if (req.method === 'PATCH') {
        const character = characters.find(c => c.id === id);
        if (!character) {
            return res.status(404).json({ error: 'Character not found' });
        }

        const { hp, ap, currency } = req.body;
        if (hp !== undefined) character.hp = hp;
        if (ap !== undefined) character.ap = ap;
        if (currency !== undefined) character.currency = currency;

        return res.status(200).json(character);
    }

    res.setHeader('Allow', ['GET', 'PATCH']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
}