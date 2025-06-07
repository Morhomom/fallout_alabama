import { getPlayers, getPlayerById, updatePlayer } from '../backend/data/db.js';

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        if (id) {
            const character = await getPlayerById(id);
            if (!character) {
                return res.status(404).json({ error: 'Character not found' });
            }
            return res.status(200).json(character);
        }
        const characters = await getPlayers();
        return res.status(200).json(characters);
    }

    if (req.method === 'PATCH') {
        const existing = await getPlayerById(id);
        if (!existing) {
            return res.status(404).json({ error: 'Character not found' });
        }

        const {
            hp,
            ap,
            currency,
            strength,
            perception,
            endurance,
            charisma,
            intelligence,
            agility,
            luck,
        } = req.body;

        const updated = await updatePlayer(id, {
            ...(hp !== undefined && { hp }),
            ...(ap !== undefined && { ap }),
            ...(currency !== undefined && { currency }),
            ...(strength !== undefined && { strength }),
            ...(perception !== undefined && { perception }),
            ...(endurance !== undefined && { endurance }),
            ...(charisma !== undefined && { charisma }),
            ...(intelligence !== undefined && { intelligence }),
            ...(agility !== undefined && { agility }),
            ...(luck !== undefined && { luck }),
        });

        return res.status(200).json(updated);
    }

    res.setHeader('Allow', ['GET', 'PATCH']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
}