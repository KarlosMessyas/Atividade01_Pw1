import express, { Request, Response } from 'express';
import { user } from '../model/userType';
import { v4 as uuid } from 'uuid';
import checkExistsUserAccount from '../middlewares/checkExistsUserAccount';

const technologiesRouter = express.Router();

interface CustomRequest extends Request {
    userIndex?: number;
}

technologiesRouter.get("/", checkExistsUserAccount, (req: CustomRequest, res: Response) => {
    const userIndex = req.userIndex;
    if (userIndex === undefined) {
        return res.status(400).json({ error: "Usuário não encontrado." });
    }
    res.status(200).json({
        technologies: user[userIndex].technologies
    });
});

technologiesRouter.post("/", checkExistsUserAccount, (req: CustomRequest, res: Response) => {
    const userIndex = req.userIndex;
    if (userIndex === undefined) {
        return res.status(400).json({ error: "Usuário não encontrado." });
    }
    const { title, deadline } = req.body;

    const newTechnology = {
        id: uuid(),
        title,
        studied: false,
        deadline: new Date(deadline),
        created_at: new Date()
    };

    user[userIndex].technologies.push(newTechnology);
    res.status(201).json({
        technology: newTechnology
    });
});

technologiesRouter.put("/:id", checkExistsUserAccount, (req: CustomRequest, res: Response) => {
    const userIndex = req.userIndex;
    if (userIndex === undefined) {
        return res.status(400).json({ error: "Usuário não encontrado." });
    }
    const { id } = req.params;
    const { title, deadline } = req.body;

    const technology = user[userIndex].technologies.find(tech => tech.id === id);
    if (!technology) {
        return res.status(404).json({
            error: 'Tecnologia não encontrada.'
        });
    }

    technology.title = title;
    technology.deadline = new Date(deadline);
    res.status(200).json({ technology });
});

technologiesRouter.patch("/:id/studied", checkExistsUserAccount, (req: CustomRequest, res: Response) => {
    const userIndex = req.userIndex;
    if (userIndex === undefined) {
        return res.status(400).json({ error: "Usuário não encontrado." });
    }
    const { id } = req.params;

    const technology = user[userIndex].technologies.find(tech => tech.id === id);
    if (!technology) {
        return res.status(404).json({
            error: 'Tecnologia não encontrada.'
        });
    }

    technology.studied = true;
    res.status(200).json("Mudança feita com sucesso");
});

technologiesRouter.delete("/:id", checkExistsUserAccount, (req: CustomRequest, res: Response) => {
    const userIndex = req.userIndex;
    if (userIndex === undefined) {
        return res.status(400).json({ error: "Usuário não encontrado." });
    }
    const { id } = req.params;

    const technologyIndex = user[userIndex].technologies.findIndex(tech => tech.id === id);
    if (technologyIndex === -1) {
        return res.status(404).json({
            error: 'Tecnologia não encontrada.'
        });
    }

    user[userIndex].technologies.splice(technologyIndex, 1);
    res.status(200).json("Tecnologia apagada com sucesso");
});

export default technologiesRouter;
