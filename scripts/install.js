#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectPath = process.cwd();
const claudeDir = path.join(projectPath, '.claude');
const settingsPath = path.join(claudeDir, 'settings.json');

// Asegurar que .claude/ existe
if (!fs.existsSync(claudeDir)) {
  fs.mkdirSync(claudeDir, { recursive: true });
}

// Leer o crear settings.json
let settings = {};
if (fs.existsSync(settingsPath)) {
  try {
    settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
  } catch (e) {
    console.error('Error leyendo settings.json:', e.message);
    process.exit(1);
  }
}

// Inicializar token-optimizer config
if (!settings['token-optimizer']) {
  settings['token-optimizer'] = {
    enabled: true,
    level: 1, // por defecto nivel 1
    installed_at: new Date().toISOString()
  };
}

// Activar si estaba desactivado
settings['token-optimizer'].enabled = true;

// Guardar
fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));

console.log('✅ token-optimizer instalado en:', projectPath);
console.log('   Nivel: ' + settings['token-optimizer'].level);
console.log('   Estado: ' + (settings['token-optimizer'].enabled ? 'activo' : 'inactivo'));
console.log('\nCambiar nivel: /token-optimizer:level <0-3>');
console.log('Desinstalar: /token-optimizer:uninstall');
