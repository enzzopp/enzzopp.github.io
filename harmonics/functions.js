export function generateScale(tone) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const intervals = (tone.includes('m')) ? [2, 1, 2, 2, 1, 2, 2] : [2, 2, 1, 2, 2, 2, 1];

    tone = tone.replace('m', '');

    if (!notes.includes(tone.toUpperCase())) {
        console.log('Invalid tone');
        return;
    }

    let toneIdx = notes.indexOf(tone.toUpperCase());
    const scale = [notes[toneIdx]];

    for (const interval of intervals) {
        toneIdx = (toneIdx + interval) % notes.length;

        let currentNote = notes[toneIdx];
        if (currentNote[0] === scale[scale.length - 1][0]) {
            if (currentNote[0] !== 'G') {
                currentNote = String.fromCharCode(currentNote.charCodeAt(0) + 1) + 'b';
            } else {
                currentNote = 'Ab';
            }
        }

        scale.push(currentNote);
    }

    return scale;
}

export function toneToWord(tone) {
    const dicionarioNotas = {
        'C': 'Dó Maior',
        'C#': 'Dó# Maior',
        'Db': 'Réb Maior',
        'D': 'Ré Maior',
        'D#': 'Ré# Maior',
        'Eb': 'Mib Maior',
        'E': 'Mi Maior',
        'F': 'Fá Maior',
        'F#': 'Fá# Maior',
        'Gb': 'Solb Maior',
        'G': 'Sol Maior',
        'G#': 'Sol# Maior',
        'Ab': 'Láb Maior',
        'A': 'Lá Maior',
        'A#': 'Lá# Maior',
        'Bb': 'Sib Maior',
        'B': 'Si Maior',
        'Cm': 'Dó Menor',
        'C#m': 'Dó# Menor',
        'Dm': 'Ré Menor',
        'D#m': 'Ré# Menor',
        'Em': 'Mi Menor',
        'Fm': 'Fá Menor',
        'F#m': 'Fá# Menor',
        'Gm': 'Sol Menor',
        'G#m': 'Sol# Menor',
        'Am': 'Lá Menor',
        'A#m': 'Lá# Menor',
        'Bm': 'Si Menor'
    };
    
    return dicionarioNotas[tone];
    
}

export function generateHarmonicField(scale) {
    const minorInterval = [1, 2, 5, 6];
    const harmonicField = [...scale];

    for (const i of minorInterval) {
        harmonicField[i] += 'm';
    }

    harmonicField[6] += '7';

    return harmonicField;
}

export function showScale(scale) {
    const boxesContent = document.querySelectorAll('[id^="box-content"]');
    
    boxesContent.forEach(function(box, index) {
        if (scale[index]) {
            box.textContent = scale[index];
        }
    });
}
