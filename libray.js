const JayLibrary = {
    storageKey: "jay_executor_script_library",

    getAll() {
        try {
            return JSON.parse(
                localStorage.getItem(this.storageKey)
            ) || [];
        } catch {
            return [];
        }
    },

    save(name, script, game = "Uncategorized", category = "General") {
        if (!name || !script) {
            throw new Error("Script name and code are required.");
        }

        const scripts = this.getAll();

        const newScript = {
            id: crypto.randomUUID(),
            name,
            script,
            game: game || "Uncategorized",
            category: category || "General",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        scripts.push(newScript);

        localStorage.setItem(
            this.storageKey,
            JSON.stringify(scripts)
        );

        return newScript;
    },

    get(id) {
        return this.getAll().find(item => item.id === id);
    },

    getByGame(game) {
        return this.getAll().filter(item => item.game === game);
    },

    getByCategory(category) {
        return this.getAll().filter(
            item => item.category === category
        );
    },

    update(id, changes) {
        const scripts = this.getAll();
        const index = scripts.findIndex(item => item.id === id);

        if (index === -1) return false;

        scripts[index] = {
            ...scripts[index],
            ...changes,
            id: scripts[index].id,
            updatedAt: new Date().toISOString()
        };

        localStorage.setItem(
            this.storageKey,
            JSON.stringify(scripts)
        );

        return true;
    },

    rename(id, newName) {
        return this.update(id, { name: newName });
    },

    delete(id) {
        const scripts = this.getAll();
        const updated = scripts.filter(item => item.id !== id);

        localStorage.setItem(
            this.storageKey,
            JSON.stringify(updated)
        );

        return updated.length !== scripts.length;
    },

    getCategories() {
        return [
            ...new Set(
                this.getAll().map(item => item.category)
            )
        ];
    },

    getGames() {
        return [
            ...new Set(
                this.getAll().map(item => item.game)
            )
        ];
    },

    clearAll() {
        localStorage.removeItem(this.storageKey);
    }
};

window.JayLibrary = JayLibrary;