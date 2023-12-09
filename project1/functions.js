export function generateScale(tone) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const intervals = [2, 2, 1, 2, 2, 2, 1];

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
        'C': 'Dó',
        'C#': 'Dó Sustenido',
        'D': 'Ré',
        'D#': 'Ré Sustenido',
        'E': 'Mi',
        'F': 'Fá',
        'F#': 'Fá Sustenido',
        'G': 'Sol',
        'G#': 'Sol Sustenido',
        'A': 'Lá',
        'A#': 'Lá Sustenido',
        'B': 'Si'
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
