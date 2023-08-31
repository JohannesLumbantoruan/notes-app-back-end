/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql("INSERT INTO users VALUES ('old_notes', 'old_notes', 'old_notes', 'old_notes')");

    pgm.sql("UPDATE notes SET OWNER = 'old_notes' WHERE owner IS NULL");

    pgm.addConstraint('notes', 'fk_notes.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = pgm => {
    pgm.dropConstraint('notes', 'fk_notes.owner_users.id');

    pgm.sql("UPDATE notes SET owner = NULL where owner = 'old_notes'");

    pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};
