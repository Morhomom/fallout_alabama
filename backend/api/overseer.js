import characters from '../../data/players.js';

export default function handler(req, res) {
    if (req.method === 'PATCH') {
        const { id } = req.query;
        const character = characters.find(c => c.id === id);
        if (!character) return res.status(404).json({ error: 'Character not found' });

        const { hp, ap, currency } = req.body;
        if (hp !== undefined && (hp < 0 || hp > 100)) {
            return res.status(400).json({ error: 'HP must be between 0 and 100' });
        }
        if (ap !== undefined && (ap < 0 || ap > 100)) {
            return res.status(400).json({ error: 'AP must be between 0 and 100' });
        }
        if (currency !== undefined && currency < 0) {
            return res.status(400).json({ error: 'Currency cannot be negative' });
        }

        if (hp !== undefined) character.hp = hp;
        if (ap !== undefined) character.ap = ap;
        if (currency !== undefined) character.currency = currency;

        return res.status(200).json(character);
    }

    if (req.method === 'POST') {
        const { id } = req.query;
        const character = characters.find(c => c.id === id);
        if (!character) return res.status(404).json({ error: 'Character not found' });

        const { item } = req.body;
        if (!item) return res.status(400).json({ error: 'Item is required' });

        character.inventory.push(item);
        return res.status(200).json(character);
    }

    if (req.method === 'DELETE') {
        const { id, itemId } = req.query;
        const character = characters.find(c => c.id === id);
        if (!character) return res.status(404).json({ error: 'Character not found' });

        character.inventory = character.inventory.filter((_, index) => index != itemId);
        return res.status(200).json(character);
    }

    res.setHeader('Allow', ['PATCH', 'POST', 'DELETE']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
}
