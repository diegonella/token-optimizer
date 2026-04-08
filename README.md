# Token Optimizer

> [English version](README.en.md)

Skill para Claude Code que optimiza todas las respuestas para máxima calidad con mínimo uso de tokens.

## Instalación

### Opción 1: Descarga directa

```bash
curl -LO https://raw.githubusercontent.com/diegonella/token-optimizer/main/token-optimizer.skill
claude install-skill token-optimizer.skill
```

### Opción 2: Clonar el repo

```bash
git clone https://github.com/diegonella/token-optimizer.git
claude install-skill token-optimizer/token-optimizer.skill
```

## Uso

### Activar en un proyecto

```bash
/token-optimizer:install
```

Esto crea la configuración en `.claude/settings.json` del proyecto actual con nivel 1 por defecto.

### Comandos

| Comando | Efecto |
|---------|--------|
| `/token-optimizer:install` | Activa en proyecto actual (nivel 1) |
| `/token-optimizer:level N` | Cambia intensidad (0-3) |
| `/token-optimizer:toggle` | Prende/apaga sin desinstalar |
| `/token-optimizer:status` | Muestra estado actual |
| `/token-optimizer:uninstall` | Quita del proyecto |

### Niveles de optimización

| Nivel | Comportamiento | Ideal para |
|-------|----------------|-----------|
| 0 | Desactivado | Prosa, contenido creativo |
| 1 | Optimiza si respuesta es verbose (>500 tokens) | Desarrollo general (default) |
| 2 | Siempre optimiza | Tareas técnicas repetitivas |
| 3 | Optimización agresiva | Máxima densidad, usuario experto |

## Qué hace

Cuando está activo, el skill aplica estas reglas a todas las respuestas:

- **Sin cortesías** — Omite introducciones y cierres innecesarios
- **Formato denso** — Listas/tablas solo si ahorran espacio
- **Precisión técnica** — Terminología exacta, sin repetir lo obvio
- **Entrega quirúrgica** — Solo el código modificado, no el archivo completo
- **Control de redundancia** — Elige la interpretación más lógica sin preguntar
- **Raw output** — Contenido sobre estética narrativa

## Ejemplos

### Verbose (sin skill)
```
Para crear un login en React, debes seguir estos pasos. Primero, necesitas
un formulario con campos de email y contraseña. Luego, implementas la
autenticación. Es importante validar los campos antes de enviar...
```

### Optimizado (con skill, level 2+)
```tsx
<form onSubmit={async (e) => {
  e.preventDefault();
  const token = await auth(email, pwd);
  localStorage.setItem('token', token);
}}>
  <input value={email} onChange={e => setEmail(e.target.value)} />
  <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} />
  <button>Login</button>
</form>
```

## Configuración

La config se guarda en `.claude/settings.json` de cada proyecto:

```json
{
  "token-optimizer": {
    "enabled": true,
    "level": 1,
    "installed_at": "2026-04-08T15:30:00.000Z"
  }
}
```

## Estructura

```
token-optimizer/
├── SKILL.md                  # Prompt principal + reglas
├── README.md                 # Este archivo
├── token-optimizer.skill     # Paquete instalable
├── scripts/
│   ├── install.js           # Instala en .claude/
│   └── control.js           # level, toggle, status, uninstall
├── references/
│   └── ARCHITECTURE.md      # Detalles de implementación
└── evals/
    └── evals.json           # Test cases
```

## Limitaciones

- Respeta seguridad por encima de brevedad
- No sacrifica exactitud técnica
- Niveles 2-3 pueden no ser ideales para prosa o usuarios junior

## Licencia

MIT
