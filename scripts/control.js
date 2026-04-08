#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectPath = process.cwd();
const claudeDir = path.join(projectPath, '.claude');
const settingsPath = path.join(claudeDir, 'settings.json');

const command = process.argv[2];
const arg = process.argv[3];

// Leer settings.json
if (!fs.existsSync(settingsPath)) {
  console.error('❌ token-optimizer no está instalado. Ejecuta: /token-optimizer:install');
  process.exit(1);
}

let settings = {};
try {
  settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));
} catch (e) {
  console.error('Error leyendo settings.json:', e.message);
  process.exit(1);
}

if (!settings['token-optimizer']) {
  console.error('❌ token-optimizer no configurado. Ejecuta: /token-optimizer:install');
  process.exit(1);
}

const config = settings['token-optimizer'];

switch (command) {
  case 'uninstall':
    delete settings['token-optimizer'];
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    console.log('✅ token-optimizer desinstalado');
    break;

  case 'toggle':
    config.enabled = !config.enabled;
    settings['token-optimizer'] = config;
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    console.log('✅ token-optimizer ' + (config.enabled ? 'activado' : 'desactivado'));
    break;

  case 'level':
    if (!arg || isNaN(arg) || arg < 0 || arg > 3) {
      console.error('❌ Nivel inválido. Usa: /token-optimizer:level <0-3>');
      process.exit(1);
    }
    config.level = parseInt(arg);
    settings['token-optimizer'] = config;
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    const levels = ['Desactivado', 'Optimiza si verbose', 'Siempre optimiza', 'Optimización agresiva'];
    console.log('✅ Nivel cambiado a ' + arg + ': ' + levels[arg]);
    break;

  case 'status':
    console.log('Estado de token-optimizer:');
    console.log('  Habilitado:', config.enabled ? 'Sí' : 'No');
    console.log('  Nivel:', config.level);
    console.log('  Instalado:', config.installed_at);
    break;

  default:
    console.error('❌ Comando desconocido:', command);
    console.error('Comandos disponibles: uninstall, toggle, level, status');
    process.exit(1);
}
