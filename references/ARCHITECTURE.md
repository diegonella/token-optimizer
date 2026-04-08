# Arquitectura - Token Optimizer

## Estructura del Skill

```
token-optimizer/
├── SKILL.md                    # Prompt principal
├── scripts/
│   ├── install.js             # Instala hook en settings.json
│   └── control.js             # Maneja level, toggle, status, uninstall
└── references/
    └── ARCHITECTURE.md        # Este archivo
```

## Cómo Funciona

### Instalación

```bash
/token-optimizer:install
```

**Qué hace:**
1. Crea `~/.claude/settings.json` en el proyecto actual (si no existe)
2. Añade configuración `token-optimizer` con:
   - `enabled: true`
   - `level: 1` (por defecto)
   - `installed_at: ISO timestamp`
3. Imprime confirmación

### Flujo de Ejecución

Cuando escribes cualquier respuesta y está activado el skill:

1. **Hook intercepta respuesta** (via Claude Code settings.json)
2. **Evalúa nivel configurado:**
   - Level 0: nada (desactivado)
   - Level 1: si tokens > 500 → optimiza
   - Level 2: siempre → optimiza
   - Level 3: siempre → optimiza agresivamente
3. **Aplica reglas de optimización** del SKILL.md
4. **Entrega respuesta optimizada**

### Configuración (`.claude/settings.json`)

```json
{
  "token-optimizer": {
    "enabled": true,
    "level": 1,
    "installed_at": "2026-04-08T15:30:00.000Z"
  }
}
```

### Comandos Disponibles

| Comando | Script | Efecto |
|---------|--------|--------|
| `/token-optimizer:install` | install.js | Instala + activa nivel 1 |
| `/token-optimizer:uninstall` | control.js | Desactiva + borra config |
| `/token-optimizer:toggle` | control.js | Prende/apaga |
| `/token-optimizer:level N` | control.js | Cambia nivel (0-3) |
| `/token-optimizer:status` | control.js | Muestra estado actual |

## Niveles Explicados

### Level 0: Off
- Sin cambios. El skill no interviene.

### Level 1: Smart (por defecto)
- Optimiza **solo si respuesta > 500 tokens**
- Mantiene **claridad como prioridad**
- Ideal para desarrollo general

### Level 2: Balanced
- Optimiza **todas las respuestas**
- Balance entre **calidad y brevedad**
- Ideal para tareas técnicas repetitivas

### Level 3: Aggressive
- Optimiza **sin restricciones**
- Máxima **densidad de información**
- Asume **expertise del usuario**
- ⚠️ Puede perder claridad si usuario es junior

## Scope de Auto-disparo

El skill se dispara **en TODAS las respuestas** una vez instalado. Esto significa:

- ✅ Respuestas técnicas (código, debugging)
- ✅ Análisis y explicaciones
- ✅ Diseño e investigación
- ⚠️ Escritura creativa (puede afectar tono)

**Recomendación:** Si usas Claude Code para escritura creativa, mantén Level 0 en esos proyectos.

## Limitaciones Conocidas

- El skill **respeta seguridad** por encima de eficiencia
- No sacrifica **exactitud técnica** por tokens
- En **prosa/narrativa**, los niveles 2-3 pueden resultar chocantes
- Si necesitas **claridad para usuarios junior**, usa Level 1 o 0

## Desinstalación

```bash
/token-optimizer:uninstall
```

Borra la configuración de `.claude/settings.json`. El archivo persiste pero sin el skill.

## Troubleshooting

**"No está instalado"**
→ Ejecuta `/token-optimizer:install` en el proyecto

**"Settings.json no existe"**
→ El skill crea `.claude/` automáticamente. Si falla, verifica permisos.

**"Cambios no aparecen"**
→ Recarga la sesión. El hook se evalúa al iniciar.

## Roadmap

Futuras mejoras:
- Excluir ciertos tipos de respuesta (ej: documentación)
- Métricas de reducción (tokens antes/después)
- Profiles por tipo de tarea
