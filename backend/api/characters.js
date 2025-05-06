const characters = [
    { id: 'Engineer', name: 'Engineer', hp: 90, ap: 70, currency: 100, inventory: [] },
    { id: 'Ranger', name: 'Ranger', hp: 80, ap: 60, currency: 50, inventory: [] },
    { id: 'Overseer', name: 'Overseer', hp: 100, ap: 100, currency: 200, inventory: [] },
    // Další postavy...
];

export default function handler(req, res) {
    if (req.method === 'GET') {
        const { id } = req.query;
        if (id) {
            const character = characters.find(c => c.id === id);
            if (!character) return res.status(404).json({ error: 'Character not found' });
            return res.status(200).json(character);
        }
        return res.status(200).json(characters);
    }

    if (req.method === 'PATCH') {
        const { id } = req.query;
        const character = characters.find(c => c.id === id);
        if (!character) return res.status(404).json({ error: 'Character not found' });

        const { hp, ap, currency } = req.body;
        if (hp !== undefined) character.hp = hp;
        if (ap !== undefined) character.ap = ap;
        if (currency !== undefined) character.currency = currency;

        return res.status(200).json(character);
    }

    res.status(405).json({ error: 'Method not allowed' });
}