// ================== النظام الذكي للتنبؤ - النسخة النهائية المصححة ==================

// ========== 1. الثوابت والإعدادات الأساسية ==========
const STORAGE_KEY = 'SMART_PREDICTION_SYSTEM_V4';
const BACKUP_STORAGE_KEY = 'GAME_BACKUPS_V4';
const AI_MODEL_VERSION = '4.0';
const MAX_BACKUPS = 50;

// الرموز الأساسية مع إمكانية التعديل
let OPTIONS = [
    {
        id: 1,
        emoji: '🥕',
        name_ar: 'جزر',
        name_en: 'carrot',
        mult: 5,
        type: 'vegetable',
        frequency: 0,
        weight: 1
    },
    {
        id: 2,
        emoji: '🍤',
        name_ar: 'روبيان',
        name_en: 'shrimp',
        mult: 10,
        type: 'meat',
        frequency: 0,
        weight: 1
    },
    {
        id: 3,
        emoji: '🍅',
        name_ar: 'طماطم',
        name_en: 'tomato',
        mult: 5,
        type: 'vegetable',
        frequency: 0,
        weight: 1
    },
    {
        id: 4,
        emoji: '🍗',
        name_ar: 'عظم',
        name_en: 'bone',
        mult: 15,
        type: 'meat',
        frequency: 0,
        weight: 1
    },
    {
        id: 5,
        emoji: '🌽',
        name_ar: 'ذرة',
        name_en: 'corn',
        mult: 5,
        type: 'vegetable',
        frequency: 0,
        weight: 1
    },
    {
        id: 6,
        emoji: '🥩',
        name_ar: 'استيك',
        name_en: 'steak',
        mult: 25,
        type: 'meat',
        frequency: 0,
        weight: 1
    },
    {
        id: 7,
        emoji: '🥦',
        name_ar: 'بروكلي',
        name_en: 'broccoli',
        mult: 5,
        type: 'vegetable',
        frequency: 0,
        weight: 1
    },
    {
        id: 8,
        emoji: '🐟',
        name_ar: 'سمك',
        name_en: 'fish',
        mult: 45,
        type: 'meat',
        frequency: 0,
        weight: 1
    }
];

// الرموز الخاصة
const SPECIAL_SYMBOLS = [
    {
        id: 9,
        emoji: '🍕',
        name_ar: 'بيتزا',
        name_en: 'pizza',
        type: 'special',
        winGroup: 'meat',
        mult: 95
    },
    {
        id: 10,
        emoji: '🥗',
        name_ar: 'سلطة',
        name_en: 'salad',
        type: 'special',
        winGroup: 'vegetable',
        mult: 20
    },
    {
        id: 11,
        emoji: '🥕',
        name_ar: 'جزر',
        name_en: 'carrot',
        type: 'special',
        winGroup: 'vegetable',
        mult: 5
    },
    {
        id: 12,
        emoji: '🌽',
        name_ar: 'ذرة',
        name_en: 'corn',
        type: 'special',
        winGroup: 'vegetable',
        mult: 5
    }
];

// ========== 2. حالة النظام المحسنة ==========
let state = {
    // المعلومات الأساسية
    version: AI_MODEL_VERSION,
    options: JSON.parse(JSON.stringify(OPTIONS)),
    balance: 1000,
    totalWins: 0,
    totalLosses: 0,
    sessionWins: 0,
    sessionLosses: 0,
    totalSpins: 0,

    // السجل والتاريخ
    history: [],
    sessionHistory: [],
    patternMemory: [],
    spinHistory: [],

    // الرهانات الحالية
    placedBets: {},
    currentDistribution: null,
    currentBets: {},

    // إحصائيات الأداء
    accuracy: {
        classic: 0,
        markov: 0,
        reverse: 0,
        advanced: 0,
        consensus: 0,
        pro: 0,
        bars: 0
    },

    // الشريط الثامن
    proBar: {
        hits: 0,
        misses: 0,
        streak: 0,
        bestStreak: 0,
        accuracy: 0
    },

    // الإجماع
    consensus: {
        hits: 0,
        misses: 0,
        accuracy: 0
    },

    // الأشرطة
    bars: {
        hits: 0,
        misses: 0,
        accuracy: 0
    },

    // المخاطرة والأداء
    riskLevel: 0,
    riskHistory: [],
    performanceScore: 50,
    learningRate: 0.1,

    // الذاكرة الذكية
    aiMemory: {
        patterns: {},
        weights: {},
        history: [],
        predictions: []
    },

    // التخصيص الذكي المحسن
    distribution: {
        type: 'auto',
        lastDistribution: null,
        autoEnabled: false,
        smartMode: true,
        vegWeight: 60,
        meatWeight: 40,
        maxOptions: 6,
        freeBetMode: true,
        currentMaxOptions: 6
    },

    // إعدادات الرهان
    bettingSettings: {
        allowBetClearing: false,
        showBetAmounts: true,
        maxOptions: 6,
        minBet: 10,
        maxBet: 1000
    },

    // إعدادات المستخدم المحسنة
    settings: {
        sound: true,
        notifications: true,
        autoSave: true,
        riskWarnings: true,
        autoSoundProBar: true,
        autoWinSound: true,
        repeatCount: 2,
        voiceType: 'male',
        theme: 'light',
        density: 'normal',
        barsStyle: 'default',
        themeColor: '#0b66ff',
        showAnimations: true,
        showTooltips: true,
        showPredictions: true,
        confirmActions: true,
        wheelAnimations: true,
        smartPredictions: true,
        animationSpeed: 'normal',
        statsDisplay: 'detailed',
        statsRefresh: 5,
        graphicsQuality: 'medium',
        refreshRate: 60,
        aiLevel: 2,
        learningRate: 50,
        memorySize: 100,
        deepLearning: true,
        enableExperimental: false,
        enableDebug: false,
        enableLogging: false,
        enableAnalytics: false
    },

    // إعدادات لوحة التحكم
    controlSettings: {
        smartControl: true,
        autoDistribute: false,
        autoBetting: false,
        riskControl: true,
        freeBetMode: true,
        maxBetOptions: 6,
        autoBackup: false,
        backupInterval: 5
    },

    // تخصيص الرموز
    customSymbols: JSON.parse(JSON.stringify(OPTIONS)),
    customSpecialSymbols: JSON.parse(JSON.stringify(SPECIAL_SYMBOLS)),

    // النسخ الاحتياطي
    backup: {
        enabled: false,
        settings: {
            winner: true,
            predictions: true,
            bets: true,
            stats: true,
            patterns: true,
            settings: true
        },
        lastBackup: null,
        backupCount: 0,
        backupSize: 0
    },

    // الجلسة
    session: {
        startTime: Date.now(),
        duration: 0,
        streak: 0,
        accuracy: 0,
        hotStreak: 0
    },

    // النظام
    system: {
        memoryUsage: 0,
        cacheSize: 100,
        lastOptimization: null,
        diagnostics: {}
    }
};

// ========== 3. نظام الذاكرة الذكية ==========
const aiMemorySystem = {
    patterns: {},
    weights: {},
    history: [],
    predictions: [],

    init: function() {
        this.patterns = {};
        this.weights = {};
        this.history = [];
        this.predictions = [];

        state.options.forEach(option => {
            this.weights[option.id] = 1;
        });
        
        state.aiMemory = this;
        console.log('✅ تم تهيئة الذاكرة الذكية');
    },

    recordPattern: function(winnerId, wasPredicted) {
        const option = state.options.find(o => o.id === winnerId);
        if (!option) return;

        const emoji = option.emoji;
        
        if (!this.patterns[emoji]) {
            this.patterns[emoji] = {
                wins: 0,
                misses: 0,
                frequency: 0,
                lastSeen: Date.now(),
                streak: 0,
                bestStreak: 0
            };
        }

        if (wasPredicted) {
            this.patterns[emoji].wins++;
            this.patterns[emoji].streak++;
            
            if (this.patterns[emoji].streak > this.patterns[emoji].bestStreak) {
                this.patterns[emoji].bestStreak = this.patterns[emoji].streak;
            }
        } else {
            this.patterns[emoji].misses++;
            this.patterns[emoji].streak = 0;
        }

        this.patterns[emoji].frequency++;
        this.patterns[emoji].lastSeen = Date.now();

        const total = this.patterns[emoji].wins + this.patterns[emoji].misses;
        if (total > 0) {
            const successRate = this.patterns[emoji].wins / total;
            this.weights[emoji] = 0.5 + (successRate * 0.5);
            
            option.weight = this.weights[emoji];
        } else {
            this.weights[emoji] = 1;
            option.weight = 1;
        }

        this.history.push({
            emoji: emoji,
            predicted: wasPredicted,
            timestamp: Date.now(),
            weight: this.weights[emoji]
        });

        if (this.history.length > state.settings.memorySize) {
            this.history.shift();
        }

        state.aiMemory = this;
    },

    getWeight: function(emoji) {
        return this.weights[emoji] || 1;
    },

    getPattern: function(emoji) {
        return this.patterns[emoji] || null;
    },

    clearPatterns: function() {
        this.patterns = {};
        this.weights = {};
        this.history = [];
        this.predictions = [];
        
        state.options.forEach(option => {
            this.weights[option.emoji] = 1;
            option.weight = 1;
        });
        
        state.aiMemory = this;
        console.log('✅ تم مسح أنماط التعلم');
    },

    analyzePatterns: function() {
        const analysis = {
            totalPatterns: Object.keys(this.patterns).length,
            mostFrequent: null,
                        bestAccuracy: 0,
            worstAccuracy: 1,
            averageWeight: 0
        };

        let totalWeight = 0;
        let count = 0;

        Object.entries(this.patterns).forEach(([emoji, pattern]) => {
            const total = pattern.wins + pattern.misses;
            if (total > 0) {
                const accuracy = pattern.wins / total;
                
                if (accuracy > analysis.bestAccuracy) {
                    analysis.bestAccuracy = accuracy;
                    analysis.mostFrequent = emoji;
                }
                
                if (accuracy < analysis.worstAccuracy) {
                    analysis.worstAccuracy = accuracy;
                }
                
                totalWeight += this.weights[emoji] || 1;
                count++;
            }
        });

        if (count > 0) {
            analysis.averageWeight = totalWeight / count;
        }

        return analysis;
    },

    predictNext: function() {
        const recent = this.history.slice(-10);
        if (recent.length < 3) return null;

        const frequencies = {};
        recent.forEach(item => {
            frequencies[item.emoji] = (frequencies[item.emoji] || 0) + 1;
        });

        let bestEmoji = null;
        let bestScore = -1;

        Object.entries(frequencies).forEach(([emoji, freq]) => {
            const weight = this.weights[emoji] || 1;
            const score = freq * weight * (this.patterns[emoji]?.streak || 1);
            
            if (score > bestScore) {
                bestScore = score;
                bestEmoji = emoji;
            }
        });

        return bestEmoji;
    }
};

// ========== 4. نظام الصوت المحسن ==========
const audioSystem = {
    cache: {},
    currentAudio: null,
    queue: [],
    isPlaying: false,
    isMuted: false,
    userHasInteracted: false,
    barSounds: {},
    volume: 0.8,

    init: function() {
        console.log('🔊 جاري تهيئة النظام الصوتي...');
        this.loadAudioFiles();
        this.setupAudioEvents();
    },

    setupAudioEvents: function() {
        document.addEventListener('click', () => {
            this.userHasInteracted = true;
        });
    },

    loadAudioFiles: function() {
        const gender = state.settings.voiceType;
        console.log(`🔊 جاري تحميل ملفات الصوت من: sound/${gender}/`);

        // تحميل جميع الأصوات
        [...state.options, ...state.customSpecialSymbols].forEach(option => {
            this.loadSoundFile(option);
        });

        // أصوات النظام
        this.loadSystemSounds();
        
        console.log('🎵 تم تهيئة النظام الصوتي');
    },

    loadSoundFile: function(option) {
        const audioPath = `sound/${state.settings.voiceType}/${option.name_en}.wav`;
        
        try {
            const audio = new Audio();
            audio.preload = 'auto';
            audio.volume = this.volume;
            
            // في حالة عدم وجود الملف، نستخدم صوت افتراضي
            audio.onerror = () => {
                console.log(`⚠️ صوت ${option.name_ar} غير متوفر، سيتم استخدام صوت افتراضي`);
                this.createDefaultSound(option);
            };
            
            audio.src = audioPath;
            this.cache[option.emoji] = audio;
        } catch (error) {
            console.log(`❌ خطأ في تحميل صوت ${option.name_ar}:`, error);
            this.createDefaultSound(option);
        }
    },

    createDefaultSound: function(option) {
        const mockAudio = {
            play: function() {
                console.log(`🎵 [افتراضي] ${option.name_ar} - ${option.emoji}`);
                return Promise.resolve();
            },
            pause: function() {},
            currentTime: 0,
            volume: 0.8,
            onended: null
        };

        this.cache[option.emoji] = mockAudio;
        return mockAudio;
    },

    loadSystemSounds: function() {
        const systemSounds = {
            
        };

        Object.entries(systemSounds).forEach(([key, path]) => {
            try {
                const audio = new Audio();
                audio.preload = 'auto';
                audio.volume = this.volume;
                audio.src = path;
                this.cache[key] = audio;
            } catch (error) {
                console.log(`❌ خطأ في تحميل صوت النظام ${key}:`, error);
            }
        });
    },

    playSound: function(soundKey, callback = null) {
        if (this.isMuted || !state.settings.sound || !this.userHasInteracted) {
            if (callback) setTimeout(callback, 300);
            return;
        }

        const audio = this.cache[soundKey];
        if (audio && typeof audio.play === 'function') {
            this.currentAudio = audio;
            audio.currentTime = 0;
            audio.volume = this.volume;

            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    if (callback) {
                        audio.onended = callback;
                    }
                }).catch(error => {
                    console.log('❌ لم يتم تشغيل الصوت:', error);
                    if (callback) setTimeout(callback, 300);
                });
            } else {
                if (callback) setTimeout(callback, 300);
            }
        } else {
            if (callback) setTimeout(callback, 300);
        }
    },

    playSequence: function(sounds, callback = null) {
        if (this.isMuted || !state.settings.sound || !sounds || sounds.length === 0) {
            if (callback) setTimeout(callback, 300);
            return;
        }

        this.queue = [...sounds];
        this.playNext(callback);
    },

    playNext: function(callback = null) {
        if (this.queue.length === 0) {
            this.isPlaying = false;
            if (callback) callback();
            return;
        }

        const soundKey = this.queue.shift();
        this.playSound(soundKey, () => {
            setTimeout(() => this.playNext(callback), 500);
        });
    },

    stopAll: function() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
        }
        this.queue = [];
        this.isPlaying = false;
    },

    setVolume: function(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        state.settings.volume = this.volume * 100;
        
        if (this.currentAudio) {
            this.currentAudio.volume = this.volume;
        }
        
        Object.values(this.cache).forEach(audio => {
            if (audio && typeof audio.volume !== 'undefined') {
                audio.volume = this.volume;
            }
        });
    },

    toggleMute: function() {
        this.isMuted = !this.isMuted;
        state.settings.sound = !this.isMuted;
        this.updateMuteButton();

        UI.showNotification(
            this.isMuted ? '🔇 تم كتم الصوت' : '🔊 تم تفعيل الصوت',
            this.isMuted ? 'سيتم إيقاف جميع الأصوات' : 'الصوت جاهز للاستخدام',
            this.isMuted ? 'info' : 'success'
        );
    },

    updateMuteButton: function() {
        const btn = document.getElementById('toggleSoundBtn');
        if (btn) {
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = this.isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
            }

            const span = btn.querySelector('span');
            if (span) {
                span.textContent = this.isMuted ? 'كتم' : 'صوت';
            }
        }
    },

    playWinSound: function() {
        if (state.settings.sound && state.settings.autoWinSound) {
            this.playSound('win');
        }
    },

    playLossSound: function() {
        if (state.settings.sound) {
            this.playSound('loss');
        }
    },

    playBetSound: function() {
        if (state.settings.sound) {
            this.playSound('bet');
        }
    },

    playSpinSound: function() {
        if (state.settings.sound) {
            this.playSound('spin');
        }
    }
};

// ========== 5. خوارزميات التنبؤ المحسنة ==========
const predictionEngine = {
    lastPredictions: {
        classic: [],
        markov: [],
        reverse: [],
        advanced: [],
        pattern: [],
        consensus: [],
        pro: []
    },

    historyLimit: 50,

    generateClassic: function() {
        const history = state.history;
        if (history.length < 3) return [];

        const recent = history.slice(0, Math.min(20, history.length));
        const frequency = {};

        recent.forEach(item => {
            frequency[item.emoji] = (frequency[item.emoji] || 0) + 1;
        });

        const predictions = Object.entries(frequency)
        .map(([emoji, count]) => {
            const option = state.options.find(o => o.emoji === emoji);
            return {
                emoji: emoji,
                confidence: count / recent.length,
                type: option?.type || 'unknown',
                score: count * 10 * (option?.weight || 1),
                name: option?.name_ar || ''
            };
        })
        .sort((a, b) => b.score - a.score);

        this.lastPredictions.classic = predictions;
        return predictions.slice(0, 8);
    },

    generateMarkov: function() {
        const history = state.history;
        if (history.length < 4) return [];

        const transitions = {};
        const recent = history.slice(0, Math.min(30, history.length));

        for (let i = 0; i < recent.length - 1; i++) {
            const from = recent[i].emoji;
            const to = recent[i + 1].emoji;

            if (!transitions[from]) transitions[from] = {};
            transitions[from][to] = (transitions[from][to] || 0) + 1;
        }

        const lastSymbol = recent[0]?.emoji;
        if (!lastSymbol || !transitions[lastSymbol]) return [];

        const nextTransitions = transitions[lastSymbol];
        const total = Object.values(nextTransitions).reduce((sum, val) => sum + val, 0);

        const predictions = Object.entries(nextTransitions)
        .map(([emoji, count]) => {
            const option = state.options.find(o => o.emoji === emoji);
            return {
                emoji: emoji,
                confidence: count / total,
                type: option?.type || 'unknown',
                score: (count / total) * 100 * (option?.weight || 1),
                name: option?.name_ar || ''
            };
        })
        .sort((a, b) => b.score - a.score);

        this.lastPredictions.markov = predictions;
        return predictions.slice(0, 8);
    },

    generateReverse: function() {
        const history = state.history;
        if (history.length < 5) return [];

        const recent = history.slice(0, Math.min(15, history.length));
        const sequence = recent.map(h => h.emoji);
        const patterns = {};

        // نمط تكرار (ABA)
        for (let i = 0; i < sequence.length - 2; i++) {
            if (sequence[i] === sequence[i + 2]) {
                const predicted = sequence[i + 1];
                patterns[predicted] = (patterns[predicted] || 0) + 1;
            }
        }

        // أنماط أطول
        for (let len = 2; len <= 4; len++) {
            for (let i = 0; i <= sequence.length - len * 2; i++) {
                const pattern = sequence.slice(i, i + len);
                const next = sequence.slice(i + len, i + len * 2);

                if (JSON.stringify(pattern) === JSON.stringify(next)) {
                    const predicted = sequence[i + len * 2];
                    if (predicted) {
                        patterns[predicted] = (patterns[predicted] || 0) + 2;
                    }
                }
            }
        }

        // أنماط معكوسة
        for (let i = 0; i < sequence.length - 1; i++) {
            const current = sequence[i];
            const next = sequence[i + 1];
            
            for (let j = i + 1; j < sequence.length - 1; j++) {
                if (sequence[j] === current && sequence[j + 1] === next) {
                    const predicted = sequence[j + 2];
                    if (predicted) {
                        patterns[predicted] = (patterns[predicted] || 0) + 3;
                    }
                }
            }
        }

        const predictions = Object.entries(patterns)
        .map(([emoji, count]) => {
            const option = state.options.find(o => o.emoji === emoji);
            const weight = aiMemorySystem.getWeight(emoji);
            return {
                emoji: emoji,
                confidence: Math.min(0.9, count / 10),
                type: option?.type || 'unknown',
                score: count * 15 * weight,
                name: option?.name_ar || ''
            };
        })
        .sort((a, b) => b.score - a.score);

        this.lastPredictions.reverse = predictions;
        return predictions.slice(0, 8);
    },

    generateAdvanced: function() {
        const history = state.history;
        if (history.length < 6) return [];

        const recent = history.slice(0, Math.min(15, history.length));
        const predictions = [];

        state.options.forEach(option => {
            let score = 0;

            // التكرار
            const frequency = recent.filter(h => h.emoji === option.emoji).length;
            score += frequency * 20;

            // النوع (تفضيل الخضار قليلاً)
            if (option.type === 'vegetable') score += 15;

            // المضاعف (تفضيل القيم المنخفضة)
            score += (1 / Math.max(1, option.mult)) * 100;

            // وقت الظهور الأخير
            const lastIndex = history.findIndex(h => h.emoji === option.emoji);
            if (lastIndex === -1 || lastIndex > 8) {
                score += 25; // لم يظهر منذ فترة
            } else if (lastIndex < 3) {
                score -= 10; // ظهر مؤخراً
            }

            // وزن الذاكرة الذكية
            const memoryWeight = aiMemorySystem.getWeight(option.emoji);
            score *= memoryWeight;

            // التحليل الإحصائي
            const pattern = aiMemorySystem.getPattern(option.emoji);
            if (pattern) {
                const total = pattern.wins + pattern.misses;
                if (total > 0) {
                    const accuracy = pattern.wins / total;
                    score += accuracy * 50;
                }
                
                if (pattern.streak >= 2) {
                    score += pattern.streak * 10;
                }
            }

            // تعديل حسب المخاطرة
            const riskFactor = riskAnalyzer.getRiskFactor();
            score *= riskFactor;

            predictions.push({
                emoji: option.emoji,
                confidence: Math.min(0.95, score / 100),
                type: option.type,
                score: Math.round(score),
                strength: this.getStrength(score),
                name: option.name_ar
            });
        });

        const sorted = predictions.sort((a, b) => b.score - a.score);
        this.lastPredictions.advanced = sorted;
        return sorted.slice(0, 8);
    },

    generateConsensus: function() {
        const allPredictions = [
            ...this.generateClassic(),
            ...this.generateMarkov(),
            ...this.generateReverse(),
            ...this.generateAdvanced()
        ];

        const aggregated = {};
        allPredictions.forEach(pred => {
            if (!aggregated[pred.emoji]) {
                aggregated[pred.emoji] = {
                    emoji: pred.emoji,
                    type: pred.type,
                    totalScore: 0,
                    sources: 0,
                    maxConfidence: 0,
                    name: pred.name
                };
            }

            aggregated[pred.emoji].totalScore += pred.score || pred.confidence * 100;
            aggregated[pred.emoji].sources++;
            aggregated[pred.emoji].maxConfidence = Math.max(
                aggregated[pred.emoji].maxConfidence,
                pred.confidence
            );
        });

        const vegetables = [];
        const meats = [];

        Object.values(aggregated).forEach(item => {
            const enhanced = {
                emoji: item.emoji,
                type: item.type,
                name: item.name,
                score: Math.round(item.totalScore / Math.max(1, item.sources)),
                confidence: item.maxConfidence,
                strength: this.getStrength(item.totalScore)
            };

            if (item.type === 'vegetable') {
                vegetables.push(enhanced);
            } else if (item.type === 'meat') {
                meats.push(enhanced);
            }
        });

        const topVegetables = vegetables.sort((a, b) => b.score - a.score).slice(0, 4);
        const topMeats = meats.sort((a, b) => b.score - a.score).slice(0, 4);

        const consensus = [...topVegetables, ...topMeats].sort((a, b) => b.score - a.score);
        this.lastPredictions.consensus = consensus;
        
        // تحديث إحصائيات الأشرطة
        this.updateBarsStats(consensus);
        
        return consensus;
    },

    generateProBar: function() {
        const consensus = this.generateConsensus();

        const enhanced = consensus.map(pred => {
            let enhancedScore = pred.score;

            // عامل المخاطرة
            const riskFactor = riskAnalyzer.getRiskFactor();
            enhancedScore *= riskFactor;

            // عامل الذاكرة الذكية
            const memoryWeight = aiMemorySystem.getWeight(pred.emoji);
            enhancedScore *= memoryWeight;

            // عامل السلسلة
            const pattern = aiMemorySystem.getPattern(pred.emoji);
            if (pattern && pattern.streak >= 2) {
                enhancedScore *= (1 + (pattern.streak * 0.1));
            }

            // عامل الوقت
            const lastSeen = state.history.findIndex(h => h.emoji === pred.emoji);
            if (lastSeen === -1 || lastSeen > 10) {
                enhancedScore *= 1.2; // لم يظهر منذ فترة
            }

            return {
                ...pred,
                score: Math.round(enhancedScore),
                strength: this.getStrength(enhancedScore),
                probability: Math.min(0.95, enhancedScore / 120)
            };
        });

        const sorted = enhanced.sort((a, b) => b.score - a.score);
        this.lastPredictions.pro = sorted;
        return sorted;
    },

    getStrength: function(score) {
        if (score > 80) return 'high';
        if (score > 60) return 'high';
        if (score > 40) return 'medium';
        if (score > 25) return 'medium';
        if (score > 15) return 'low';
        return 'low';
    },

    getStrengthText: function(strength) {
        switch (strength) {
            case 'high': return 'عالية';
            case 'medium': return 'متوسطة';
            case 'low': return 'منخفضة';
            default: return 'ضعيفة';
        }
    },

    updateBarsStats: function(predictions) {
        if (state.history.length === 0) return;

        const lastWinner = state.history[0].emoji;
        const wasPredicted = predictions.some(p => p.emoji === lastWinner);

        if (wasPredicted) {
            state.bars.hits++;
        } else {
            state.bars.misses++;
        }

        const total = state.bars.hits + state.bars.misses;
        if (total > 0) {
            state.bars.accuracy = Math.round((state.bars.hits / total) * 100);
        }
    },

    evaluatePrediction: function(winnerEmoji) {
        let correct = false;

        Object.keys(this.lastPredictions).forEach(model => {
            const predictions = this.lastPredictions[model];
            if (predictions && predictions.length > 0) {
                const wasCorrect = predictions.some(p => p.emoji === winnerEmoji);

                if (wasCorrect) {
                    if (!state.accuracy[model]) state.accuracy[model] = 0;
                    state.accuracy[model] = (state.accuracy[model] * 0.9) + 10;

                    if (!state.aiMemory?.patterns) state.aiMemory.patterns = {};
                    if (!state.aiMemory.patterns[winnerEmoji]) {
                        state.aiMemory.patterns[winnerEmoji] = {
                            wins: 0,
                            misses: 0
                        };
                    }
                    state.aiMemory.patterns[winnerEmoji].wins++;

                    if (model === 'pro' || model === 'consensus') {
                        correct = true;
                    }
                } else {
                    if (state.aiMemory?.patterns?.[winnerEmoji]) {
                        state.aiMemory.patterns[winnerEmoji].misses++;
                    }
                }
            }
        });

        return correct;
    },

    clearPredictions: function() {
        this.lastPredictions = {
            classic: [],
            markov: [],
            reverse: [],
            advanced: [],
            pattern: [],
            consensus: [],
            pro: []
        };
        console.log('✅ تم مسح جميع التنبؤات');
    }
};

// ========== 6. محلل المخاطر المحسن ==========
const riskAnalyzer = {
    calculateRisk: function() {
        let risk = 0;

        // رصيد منخفض
        if (state.balance < 200) risk += 0.4;
        else if (state.balance < 500) risk += 0.2;

        // سلسلة خسائر
        if (state.sessionLosses >= 3) risk += 0.3;
        else if (state.sessionLosses >= 2) risk += 0.2;

        // توزيع الرهان
        if (state.currentDistribution) {
            const vegAmount = Object.values(state.currentDistribution)
                .filter(bet => bet.type === 'vegetable')
                .reduce((sum, bet) => sum + bet.amount, 0);

            const totalAmount = Object.values(state.currentDistribution)
                .reduce((sum, bet) => sum + bet.amount, 0);

            if (totalAmount > 0) {
                const vegRatio = vegAmount / totalAmount;
                if (vegRatio < 0.3 || vegRatio > 0.7) {
                    risk += 0.2;
                }

                // نسبة الرهان إلى الرصيد
                const betRatio = totalAmount / state.balance;
                if (betRatio > 0.5) risk += 0.3;
                else if (betRatio > 0.3) risk += 0.2;
                else if (betRatio > 0.1) risk += 0.1;
            }
        }

        // مدة الجلسة
        const sessionHours = (Date.now() - new Date(state.session?.startTime || Date.now())) / (1000 * 60 * 60);
        if (sessionHours > 2) risk += 0.2;
        else if (sessionHours > 1) risk += 0.1;

        // الدقة المنخفضة
        const totalPredictions = state.proBar.hits + state.proBar.misses;
        if (totalPredictions > 10) {
            const accuracy = state.proBar.hits / totalPredictions;
            if (accuracy < 0.3) risk += 0.3;
            else if (accuracy < 0.5) risk += 0.2;
        }

        // عدد الخيارات المراهن عليها
        const currentBetsCount = Object.keys(state.currentBets || {}).length;
        const maxOptions = state.controlSettings.maxBetOptions || 6;
        if (currentBetsCount > maxOptions * 0.8) {
            risk += 0.1;
        }

        // عامل الوقت من اليوم (للتجربة)
        const hour = new Date().getHours();
        if (hour >= 2 && hour <= 6) { // ساعات متأخرة
            risk += 0.1;
        }

        state.riskLevel = Math.min(1, Math.max(0, risk));
        return state.riskLevel;
    },

    getRiskLevel: function() {
        const risk = this.calculateRisk();

        if (risk < 0.3) {
            return {
                level: 'منخفض',
                color: '#28a745',
                icon: 'fa-check-circle',
                advice: 'المخاطرة منخفضة، يمكنك المراهنة بأمان'
            };
        } else if (risk < 0.6) {
            return {
                level: 'متوسط',
                color: '#ffc107',
                icon: 'fa-exclamation-triangle',
                advice: 'المخاطرة متوسطة، كن حذراً في الرهان'
            };
        } else {
            return {
                level: 'مرتفع',
                color: '#dc3545',
                icon: 'fa-radiation',
                advice: 'المخاطرة مرتفعة، قلل من قيمة الرهان'
            };
        }
    },

    getRiskFactor: function() {
        const risk = this.calculateRisk();

        if (risk < 0.3) {
            return 1.2; // زيادة التوقع عند المخاطرة المنخفضة
        } else if (risk < 0.6) {
            return 1.0; // متوسط
        } else {
            return 0.8; // تقليل التوقع عند المخاطرة المرتفعة
        }
    },

    suggestMaxBet: function() {
        const risk = this.calculateRisk();
        let maxBet = 100;

        if (risk < 0.3) {
            maxBet = Math.min(500, state.balance * 0.5);
        } else if (risk < 0.6) {
            maxBet = Math.min(200, state.balance * 0.3);
        } else {
            maxBet = Math.min(50, state.balance * 0.1);
        }

        return Math.max(state.bettingSettings.minBet || 10, maxBet);
    },

    validateBet: function(amount) {
        if (state.controlSettings.freeBetMode) {
            // في الوضع الحر، نتحقق فقط من الرصيد
            if (amount > state.balance) {
                return {
                    valid: false,
                    message: 'رصيد غير كافي',
                    maxAllowed: state.balance
                };
            }
            return { valid: true, message: 'الرهان آمن' };
        }

        const risk = this.calculateRisk();
        const maxBet = this.suggestMaxBet();

        if (amount > maxBet) {
            return {
                valid: false,
                message: `المبلغ ${amount} يتجاوز الحد الأقصى المسموح (${maxBet}) بسبب ارتفاع المخاطرة`,
                maxAllowed: maxBet
            };
        }

        if (amount > state.balance) {
            return {
                valid: false,
                message: 'رصيد غير كافي',
                maxAllowed: state.balance
            };
        }

        return {
            valid: true,
            message: 'الرهان آمن',
            maxAllowed: maxBet
        };
    },

    checkRiskWarning: function(amount) {
        const risk = this.calculateRisk();
        const maxBet = this.suggestMaxBet();

        if (risk > 0.6 && amount > maxBet * 0.5) {
            return {
                warning: true,
                message: '⚠️ تحذير: المخاطرة مرتفعة! حاول تقليل قيمة الرهان.',
                level: 'high'
            };
        } else if (risk > 0.3 && amount > maxBet * 0.8) {
            return {
                warning: true,
                message: '⚠️ تنبيه: المخاطرة متوسطة، كن حذراً في الرهان.',
                level: 'medium'
            };
        }

        return {
            warning: false
        };
    },

    updateRiskBadge: function() {
        const riskLevel = this.getRiskLevel();
        const badge = document.getElementById('riskLevelBadge');
        
        if (badge) {
            const icon = badge.querySelector('i');
            const span = badge.querySelector('span');
            
            if (icon) {
                icon.className = `fas ${riskLevel.icon}`;
                icon.style.color = riskLevel.color;
            }
            
            if (span) {
                span.textContent = `مخاطر: ${riskLevel.level}`;
            }
            
            badge.style.borderColor = riskLevel.color + '30';
            badge.style.backgroundColor = riskLevel.color + '10';
        }
    }
};

// ========== 7. نظام التوزيع الذكي المحسن ==========
const distributionSystem = {
    distribute: function(amount, type = 'auto') {
        if (amount <= 0) {
            UI.showNotification('خطأ في الرهان', 'المبلغ يجب أن يكون أكبر من صفر', 'error');
            return null;
        }

        // التحقق من الرصيد
        if (amount > state.balance) {
            UI.showNotification('خطأ في الرهان', 'رصيد غير كافي', 'error');
            return null;
        }

        // إشعار تحذير المخاطرة
        const riskWarning = riskAnalyzer.checkRiskWarning(amount);
        if (riskWarning.warning && state.settings.riskWarnings) {
            UI.showNotification('تحذير المخاطرة', riskWarning.message, 'warning');
        }

        const predictions = predictionEngine.generateProBar();
        if (predictions.length === 0) {
            UI.showNotification('لا توجد تنبؤات', 'انتظر جولة واحدة على الأقل', 'warning');
            return null;
        }

        let distribution;

        switch (type) {
            case 'balanced':
                distribution = this.balancedDistribution(predictions, amount);
                break;
            case 'aggressive':
                distribution = this.aggressiveDistribution(predictions, amount);
                break;
            case 'conservative':
                distribution = this.conservativeDistribution(predictions, amount);
                break;
            case 'random':
                distribution = this.randomDistribution(predictions, amount);
                break;
            case 'pattern':
                distribution = this.patternDistribution(predictions, amount);
                break;
            case 'auto':
            default:
                distribution = this.autoDistribution(predictions, amount);
        }

        // تطبيق الحد الأقصى للخيارات
        distribution = this.applyMaxOptionsLimit(distribution);

        state.currentDistribution = distribution;
        state.balance -= amount;

        // تحديث الرهانات الحالية
        this.updateCurrentBets(distribution);

        audioSystem.playBetSound();
        UI.updateDistributionPreview();
        UI.updateDashboard();

        return distribution;
    },

    applyMaxOptionsLimit: function(distribution) {
        const maxOptions = state.controlSettings.maxBetOptions || 6;
        const entries = Object.entries(distribution);

        if (entries.length <= maxOptions) {
            return distribution;
        }

        // ترتيب الرهانات حسب المبلغ
        const sorted = entries.sort((a, b) => b[1].amount - a[1].amount);

        // أخذ أفضل maxOptions رهان
        const limited = {};
        let totalRedistributed = 0;

        for (let i = 0; i < maxOptions; i++) {
            limited[sorted[i][0]] = sorted[i][1];
        }

        // توزيع المبالغ المحذوفة على الرهانات المتبقية
        for (let i = maxOptions; i < sorted.length; i++) {
            totalRedistributed += sorted[i][1].amount;
        }

        if (totalRedistributed > 0 && Object.keys(limited).length > 0) {
            const perBet = Math.floor(totalRedistributed / Object.keys(limited).length);
            Object.keys(limited).forEach(emoji => {
                limited[emoji].amount += perBet;
                limited[emoji].potentialWin = limited[emoji].amount *
                    (state.options.find(o => o.emoji === emoji)?.mult || 5);
            });
        }

        return limited;
    },

    balancedDistribution: function(predictions, totalAmount) {
        const distribution = {};
        const vegPredictions = predictions.filter(p => p.type === 'vegetable');
        const meatPredictions = predictions.filter(p => p.type === 'meat');

        const vegAmount = Math.floor(totalAmount * (state.distribution.vegWeight / 100));
        const meatAmount = Math.floor(totalAmount * (state.distribution.meatWeight / 100));
        const remainingAmount = totalAmount - vegAmount - meatAmount;

        if (vegPredictions.length > 0) {
            const vegPerItem = Math.floor(vegAmount / Math.min(3, vegPredictions.length));
            vegPredictions.slice(0, 3).forEach((pred, index) => {
                const amount = index === Math.min(3, vegPredictions.length) - 1 ?
                    vegAmount - (vegPerItem * (Math.min(3, vegPredictions.length) - 1)) : vegPerItem;

                const option = state.options.find(o => o.emoji === pred.emoji);
                distribution[pred.emoji] = {
                    amount: amount,
                    type: pred.type,
                    potentialWin: amount * (option?.mult || 5),
                    confidence: pred.confidence,
                    strength: pred.strength,
                    name: pred.name
                };
            });
        }

        if (meatPredictions.length > 0) {
            const meatPerItem = Math.floor(meatAmount / Math.min(3, meatPredictions.length));
            meatPredictions.slice(0, 3).forEach((pred, index) => {
                const amount = index === Math.min(3, meatPredictions.length) - 1 ?
                    meatAmount - (meatPerItem * (Math.min(3, meatPredictions.length) - 1)) : meatPerItem;

                const option = state.options.find(o => o.emoji === pred.emoji);
                distribution[pred.emoji] = {
                    amount: amount,
                    type: pred.type,
                    potentialWin: amount * (option?.mult || 5),
                    confidence: pred.confidence,
                    strength: pred.strength,
                    name: pred.name
                };
            });
        }

        if (remainingAmount > 0 && predictions.length > 0) {
            const bestPred = predictions[0];
            if (!distribution[bestPred.emoji]) {
                const option = state.options.find(o => o.emoji === bestPred.emoji);
                distribution[bestPred.emoji] = {
                    amount: 0,
                    type: bestPred.type,
                    potentialWin: 0,
                    confidence: bestPred.confidence,
                    strength: bestPred.strength,
                    name: bestPred.name
                };
            }
            distribution[bestPred.emoji].amount += remainingAmount;
            const option = state.options.find(o => o.emoji === bestPred.emoji);
            distribution[bestPred.emoji].potentialWin =
                distribution[bestPred.emoji].amount * (option?.mult || 5);
        }

        return distribution;
    },

    aggressiveDistribution: function(predictions, totalAmount) {
        const distribution = {};
        const topPredictions = predictions.slice(0, 2);

        if (topPredictions.length === 0) return {};

        const firstAmount = Math.floor(totalAmount * 0.7);
        const secondAmount = totalAmount - firstAmount;

        topPredictions.forEach((pred, index) => {
            const amount = index === 0 ? firstAmount : secondAmount;
            const option = state.options.find(o => o.emoji === pred.emoji);

            distribution[pred.emoji] = {
                amount: amount,
                type: pred.type,
                potentialWin: amount * (option?.mult || 5),
                confidence: pred.confidence,
                strength: pred.strength,
                name: pred.name
            };
        });

        return distribution;
    },

    conservativeDistribution: function(predictions, totalAmount) {
        const distribution = {};
        const maxOptions = Math.min(state.controlSettings.maxBetOptions || 6, 6);
        const topPredictions = predictions.slice(0, maxOptions);

        if (topPredictions.length === 0) return {};

        const amountPerItem = Math.floor(totalAmount / topPredictions.length);

        topPredictions.forEach((pred, index) => {
            const amount = index === topPredictions.length - 1 ?
                totalAmount - (amountPerItem * (topPredictions.length - 1)) : amountPerItem;

            const option = state.options.find(o => o.emoji === pred.emoji);
            distribution[pred.emoji] = {
                amount: amount,
                type: pred.type,
                potentialWin: amount * (option?.mult || 5),
                confidence: pred.confidence,
                strength: pred.strength,
                name: pred.name
            };
        });

        return distribution;
    },

    randomDistribution: function(predictions, totalAmount) {
        const distribution = {};
        const shuffled = [...predictions].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, Math.min(4, shuffled.length));

        if (selected.length === 0) return {};

        const amountPerItem = Math.floor(totalAmount / selected.length);

        selected.forEach((pred, index) => {
            const amount = index === selected.length - 1 ?
                totalAmount - (amountPerItem * (selected.length - 1)) : amountPerItem;

            const option = state.options.find(o => o.emoji === pred.emoji);
            distribution[pred.emoji] = {
                amount: amount,
                type: pred.type,
                potentialWin: amount * (option?.mult || 5),
                confidence: pred.confidence,
                strength: pred.strength,
                name: pred.name
            };
        });

        return distribution;
    },

    patternDistribution: function(predictions, totalAmount) {
        const distribution = {};
        
        // تحليل الأنماط من الذاكرة الذكية
        const patternAnalysis = aiMemorySystem.analyzePatterns();
        const patternPrediction = aiMemorySystem.predictNext();
        
        if (patternPrediction) {
            const option = state.options.find(o => o.emoji === patternPrediction);
            if (option) {
                distribution[patternPrediction] = {
                    amount: Math.floor(totalAmount * 0.6),
                    type: option.type,
                    potentialWin: Math.floor(totalAmount * 0.6) * option.mult,
                    confidence: 0.7,
                    strength: 'medium',
                    name: option.name_ar
                };
                
                // توزيع الباقي على التنبؤات الأخرى
                const remaining = totalAmount - Math.floor(totalAmount * 0.6);
                const otherPredictions = predictions.filter(p => p.emoji !== patternPrediction).slice(0, 2);
                
                if (otherPredictions.length > 0) {
                    const perItem = Math.floor(remaining / otherPredictions.length);
                    otherPredictions.forEach((pred, index) => {
                        const amount = index === otherPredictions.length - 1 ?
                            remaining - (perItem * (otherPredictions.length - 1)) : perItem;
                            
                        const opt = state.options.find(o => o.emoji === pred.emoji);
                        distribution[pred.emoji] = {
                            amount: amount,
                            type: pred.type,
                            potentialWin: amount * (opt?.mult || 5),
                            confidence: pred.confidence,
                            strength: pred.strength,
                            name: pred.name
                        };
                    });
                }
            }
        } else {
            return this.balancedDistribution(predictions, totalAmount);
        }

        return distribution;
    },

    autoDistribution: function(predictions, totalAmount) {
        const risk = riskAnalyzer.calculateRisk();

        if (risk < 0.3) {
            return this.aggressiveDistribution(predictions, totalAmount);
        } else if (risk < 0.6) {
            return this.balancedDistribution(predictions, totalAmount);
        } else {
            return this.conservativeDistribution(predictions, totalAmount);
        }
    },

    redistribute: function() {
        if (!state.currentDistribution) {
            UI.showNotification('لا يوجد توزيع', 'قم بتوزيع الرهان أولاً', 'warning');
            return null;
        }

        const totalAmount = Object.values(state.currentDistribution)
            .reduce((sum, bet) => sum + bet.amount, 0);

        state.balance += totalAmount;
        state.currentDistribution = null;
        state.currentBets = {};

        return this.distribute(totalAmount, state.distribution.type);
    },

    clearDistribution: function() {
        if (!state.currentDistribution) {
            UI.showNotification('لا يوجد رهان', 'لم يتم توزيع أي رهان', 'info');
            return false;
        }

        const totalAmount = Object.values(state.currentDistribution)
            .reduce((sum, bet) => sum + bet.amount, 0);

        state.balance += totalAmount;
        state.currentDistribution = null;
        state.currentBets = {};

        UI.showNotification('تم المسح', `تم استعادة ${totalAmount} نقطة`, 'success');
        UI.updateDashboard();
        return true;
    },

    updateCurrentBets: function(distribution) {
        state.currentBets = {};
        Object.entries(distribution).forEach(([emoji, bet]) => {
            state.currentBets[emoji] = bet.amount;
        });

        setTimeout(() => {
            UI.renderWheel();
        }, 100);
    },

    calculatePotentialWin: function(distribution) {
        if (!distribution) return 0;

        return Object.values(distribution)
            .reduce((sum, bet) => sum + bet.potentialWin, 0);
    },

    calculateTotalBet: function(distribution) {
        if (!distribution) return 0;

        return Object.values(distribution)
            .reduce((sum, bet) => sum + bet.amount, 0);
    }
};

// ========== 8. نظام النسخ الاحتياطي ==========
const backupSystem = {
    createBackup: function() {
        if (!state.backup.enabled) return null;

        const backup = {
            timestamp: new Date().toISOString(),
            version: AI_MODEL_VERSION,
            data: {}
        };

        try {
            if (state.backup.settings.winner && state.history.length > 0) {
                backup.data.winners = state.history.slice(0, 20);
            }

            if (state.backup.settings.predictions) {
                backup.data.predictions = predictionEngine.lastPredictions;
                backup.data.accuracy = state.accuracy;
            }

            if (state.backup.settings.bets && state.currentDistribution) {
                backup.data.bets = {
                    current: state.currentDistribution,
                    placed: state.placedBets,
                    currentBets: state.currentBets
                };
            }

            if (state.backup.settings.stats) {
                backup.data.stats = {
                    balance: state.balance,
                    wins: state.totalWins,
                    losses: state.totalLosses,
                    proBar: state.proBar,
                    consensus: state.consensus,
                    bars: state.bars,
                    session: state.session
                };
            }

            if (state.backup.settings.patterns) {
                backup.data.patterns = state.aiMemory;
            }

            if (state.backup.settings.settings) {
                backup.data.settings = {
                    controlSettings: state.controlSettings,
                    settings: state.settings,
                    backup: state.backup,
                    distribution: state.distribution,
                    bettingSettings: state.bettingSettings
                };
            }

            const backups = this.getBackups();
            backups.push(backup);

            // حفظ فقط أحدث النسخ
            if (backups.length > MAX_BACKUPS) {
                backups.splice(0, backups.length - MAX_BACKUPS);
            }

            localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(backups));

            state.backup.lastBackup = backup.timestamp;
            state.backup.backupCount = backups.length;
            state.backup.backupSize = Math.round(JSON.stringify(backups).length / 1024);

            console.log(`✅ تم إنشاء نسخة احتياطية #${backups.length}`);
            return backup;
        } catch (error) {
            console.error('❌ خطأ في إنشاء النسخة الاحتياطية:', error);
            return null;
        }
    },

    getBackups: function() {
        try {
            const backups = localStorage.getItem(BACKUP_STORAGE_KEY);
            return backups ? JSON.parse(backups) : [];
        } catch (error) {
            console.error('❌ خطأ في قراءة النسخ الاحتياطية:', error);
            return [];
        }
    },

    exportBackup: function() {
        const backups = this.getBackups();
        if (backups.length === 0) {
            UI.showNotification('لا توجد نسخ', 'لم يتم إنشاء أي نسخ احتياطية', 'warning');
            return;
        }

        try {
            const dataStr = JSON.stringify(backups, null, 2);
            const dataBlob = new Blob([dataStr], {
                type: 'application/json'
            });
            const url = URL.createObjectURL(dataBlob);
            const a = document.createElement('a');

            a.href = url;
            a.download = `smart_prediction_backup_${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            UI.showNotification('تم التصدير', `تم تصدير ${backups.length} نسخة احتياطية`, 'success');
        } catch (error) {
            console.error('❌ خطأ في تصدير النسخة الاحتياطية:', error);
            UI.showNotification('خطأ', 'فشل في تصدير النسخة', 'error');
        }
    },

    importBackup: function(file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            try {
                const imported = JSON.parse(e.target.result);
                if (Array.isArray(imported)) {
                    const currentBackups = backupSystem.getBackups();
                    const merged = [...currentBackups, ...imported];

                    const trimmed = merged.slice(-MAX_BACKUPS);
                    localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify(trimmed));

                    state.backup.backupCount = trimmed.length;
                    if (trimmed.length > 0) {
                        state.backup.lastBackup = trimmed[trimmed.length - 1].timestamp;
                    }

                    UI.showNotification('تم الاستيراد', `تم استيراد ${imported.length} نسخة`, 'success');
                    backupSystem.updateBackupInfo();
                } else {
                    UI.showNotification('خطأ', 'ملف غير صالح', 'error');
                }
            } catch (error) {
                console.error('❌ خطأ في استيراد النسخة:', error);
                UI.showNotification('خطأ', 'ملف غير صالح', 'error');
            }
        };

        reader.readAsText(file);
    },

    clearOldBackups: function() {
        if (confirm('هل تريد مسح جميع النسخ الاحتياطية القديمة؟')) {
            localStorage.removeItem(BACKUP_STORAGE_KEY);
            state.backup.lastBackup = null;
            state.backup.backupCount = 0;
            state.backup.backupSize = 0;
            UI.showNotification('تم المسح', 'تم حذف جميع النسخ الاحتياطية', 'success');
            backupSystem.updateBackupInfo();
        }
    },

    updateBackupInfo: function() {
        const backups = this.getBackups();

        const lastBackupTimeElement = document.getElementById('lastBackupTime');
        if (lastBackupTimeElement) {
            lastBackupTimeElement.textContent =
                state.backup.lastBackup ? new Date(state.backup.lastBackup).toLocaleString() : 'لم يتم بعد';
        }

        const backupCountElement = document.getElementById('backupCount');
        if (backupCountElement) {
            backupCountElement.textContent = backups.length;
        }

        const backupSizeElement = document.getElementById('backupSize');
        if (backupSizeElement) {
            const size = backups.reduce((total, backup) => total + JSON.stringify(backup).length, 0);
            backupSizeElement.textContent = Math.round(size / 1024) + ' KB';
        }
    },

    backupNow: function() {
        const backup = this.createBackup();
        if (backup) {
            UI.showNotification('تم النسخ', 'تم إنشاء نسخة احتياطية جديدة', 'success');
            this.updateBackupInfo();
        }
    },

    restoreFromBackup: function(backupIndex) {
        const backups = this.getBackups();
        if (backupIndex < 0 || backupIndex >= backups.length) {
            UI.showNotification('خطأ', 'النسخة غير موجودة', 'error');
            return;
        }

        const backup = backups[backupIndex];
        if (confirm(`هل تريد استعادة النسخة من ${new Date(backup.timestamp).toLocaleString()}؟`)) {
            try {
                // استعادة البيانات
                if (backup.data.winners) {
                    state.history = backup.data.winners;
                }

                if (backup.data.stats) {
                    state.balance = backup.data.stats.balance || state.balance;
                    state.totalWins = backup.data.stats.wins || state.totalWins;
                    state.totalLosses = backup.data.stats.losses || state.totalLosses;
                    state.proBar = backup.data.stats.proBar || state.proBar;
                    state.consensus = backup.data.stats.consensus || state.consensus;
                    state.bars = backup.data.stats.bars || state.bars;
                    state.session = backup.data.stats.session || state.session;
                }

                if (backup.data.bets) {
                    state.currentDistribution = backup.data.bets.current || null;
                    state.placedBets = backup.data.bets.placed || {};
                    state.currentBets = backup.data.bets.currentBets || {};
                }

                if (backup.data.patterns) {
                    state.aiMemory = backup.data.patterns;
                }

                if (backup.data.settings) {
                    state.controlSettings = backup.data.settings.controlSettings || state.controlSettings;
                    state.settings = backup.data.settings.settings || state.settings;
                    state.backup = backup.data.settings.backup || state.backup;
                    state.distribution = backup.data.settings.distribution || state.distribution;
                    state.bettingSettings = backup.data.settings.bettingSettings || state.bettingSettings;
                }

                UI.saveState();
                UI.renderAll();
                settingsManager.applySettingsToUI();

                UI.showNotification('تم الاستعادة', 'تم استعادة النسخة الاحتياطية بنجاح', 'success');
            } catch (error) {
                console.error('❌ خطأ في استعادة النسخة:', error);
                UI.showNotification('خطأ', 'فشل في استعادة النسخة', 'error');
            }
        }
    }
};

// ========== 9. نظام تخصيص الرموز ==========
const symbolCustomizer = {
    renderEditor: function() {
        const container = document.getElementById('symbolsEditor');
        if (!container) return;

        let html = '';
        state.customSymbols.forEach((symbol, index) => {
            html += `
            <div class="symbol-editor-item" data-id="${symbol.id}">
                <div class="symbol-editor-emoji">
                    <span class="symbol-preview">${symbol.emoji}</span>
                    <input type="text" class="symbol-emoji-input" value="${symbol.emoji}"
                           data-index="${index}" maxlength="2" placeholder="رمز">
                </div>
                <div class="symbol-editor-controls">
                    <div class="symbol-editor-name">${symbol.name_ar}</div>
                    <div class="symbol-editor-mult">
                        <input type="number" class="mult-input" value="${symbol.mult}"
                               data-index="${index}" min="1" max="100" step="1">
                        <span class="mult-label">x مضاعف</span>
                    </div>
                    <div class="symbol-editor-type">
                        <select class="type-select" data-index="${index}">
                            <option value="vegetable" ${symbol.type === 'vegetable' ? 'selected' : ''}>🥦 خضار</option>
                            <option value="meat" ${symbol.type === 'meat' ? 'selected' : ''}>🥩 لحوم</option>
                        </select>
                    </div>
                </div>
            </div>
            `;
        });

        container.innerHTML = html;

        // إضافة مستمعي الأحداث
        this.setupSymbolEditorEvents();
    },

    renderSpecialSymbolsEditor: function() {
        const container = document.getElementById('specialSymbolsEditor');
        if (!container) return;

        let html = '';
        state.customSpecialSymbols.forEach((symbol, index) => {
            html += `
            <div class="symbol-editor-item" data-id="${symbol.id}">
                <div class="symbol-editor-emoji">
                    <span class="symbol-preview">${symbol.emoji}</span>
                    <input type="text" class="symbol-emoji-input" value="${symbol.emoji}"
                           data-index="${index}" data-special="true" maxlength="2" placeholder="رمز">
                </div>
                <div class="symbol-editor-controls">
                    <div class="symbol-editor-name">${symbol.name_ar}</div>
                    <div class="symbol-editor-mult">
                        <input type="number" class="mult-input" value="${symbol.mult}"
                               data-index="${index}" data-special="true" min="1" max="200" step="1">
                        <span class="mult-label">x مضاعف</span>
                    </div>
                    <div class="symbol-editor-type">
                        <select class="type-select" data-index="${index}" data-special="true">
                            <option value="meat" ${symbol.winGroup === 'meat' ? 'selected' : ''}>🥩 لحوم</option>
                            <option value="vegetable" ${symbol.winGroup === 'vegetable' ? 'selected' : ''}>🥦 خضار</option>
                            <option value="all" ${symbol.winGroup === 'all' ? 'selected' : ''}>🎯 الكل</option>
                            <option value="high" ${symbol.winGroup === 'high' ? 'selected' : ''}>👑 عالي القيمة</option>
                        </select>
                    </div>
                </div>
            </div>
            `;
        });

        container.innerHTML = html;
        this.setupSymbolEditorEvents();
    },

    setupSymbolEditorEvents: function() {
        // تحديث الإيموجي
        document.querySelectorAll('.symbol-emoji-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const index = parseInt(e.target.dataset.index);
                const isSpecial = e.target.dataset.special === 'true';
                const newEmoji = e.target.value.trim();
                
                if (newEmoji) {
                    this.updateSymbol(index, newEmoji, null, null, isSpecial);
                }
            });

            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.dataset.index);
                const isSpecial = e.target.dataset.special === 'true';
                const newEmoji = e.target.value.trim();
                const preview = e.target.parentElement.querySelector('.symbol-preview');
                
                if (preview) {
                    preview.textContent = newEmoji || (isSpecial ? 
                        state.customSpecialSymbols[index]?.emoji : 
                        state.customSymbols[index]?.emoji);
                }
            });
        });

        // تحديث المضاعف
        document.querySelectorAll('.mult-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const index = parseInt(e.target.dataset.index);
                const isSpecial = e.target.dataset.special === 'true';
                const newMult = parseInt(e.target.value);
                
                if (!isNaN(newMult) && newMult >= 1 && newMult <= (isSpecial ? 200 : 100)) {
                    this.updateSymbol(index, null, newMult, null, isSpecial);
                }
            });
        });

        // تحديث النوع
        document.querySelectorAll('.type-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const index = parseInt(e.target.dataset.index);
                const isSpecial = e.target.dataset.special === 'true';
                const newType = e.target.value;
                
                this.updateSymbol(index, null, null, newType, isSpecial);
            });
        });
    },

    updateSymbol: function(index, newEmoji = null, newMultiplier = null, newType = null, isSpecial = false) {
        let symbolsArray, originalSymbols;
        
        if (isSpecial) {
            symbolsArray = state.customSpecialSymbols;
            originalSymbols = SPECIAL_SYMBOLS;
        } else {
            symbolsArray = state.customSymbols;
            originalSymbols = OPTIONS;
        }

        if (index < 0 || index >= symbolsArray.length) return;

        const symbol = symbolsArray[index];
        const originalSymbol = originalSymbols[index];

        if (newEmoji !== null) {
            symbol.emoji = newEmoji;
            if (!isSpecial) {
                state.options[index].emoji = newEmoji;
            }
        }

        if (newMultiplier !== null) {
            symbol.mult = newMultiplier;
            if (!isSpecial) {
                state.options[index].mult = newMultiplier;
            }
        }

        if (newType !== null) {
            if (isSpecial) {
                symbol.winGroup = newType;
            } else {
                symbol.type = newType;
                state.options[index].type = newType;
            }
        }

        // تحديث اسم الرمز إذا كان التغيير من الرموز الافتراضية
        if (symbol.emoji !== originalSymbol.emoji) {
            if (!isSpecial) {
                symbol.name_ar = `مخصص ${index + 1}`;
                symbol.name_en = `custom_${index + 1}`;
                state.options[index].name_ar = symbol.name_ar;
                state.options[index].name_en = symbol.name_en;
            }
        }

        UI.renderWheel();
        UI.renderWinningOptions();
        UI.showNotification('تم التحديث', 'تم تحديث الرمز بنجاح', 'success');
    },

    resetSymbols: function() {
        if (confirm('هل تريد إعادة تعيين جميع الرموز إلى الحالة الافتراضية؟')) {
            state.customSymbols = JSON.parse(JSON.stringify(OPTIONS));
            state.options = JSON.parse(JSON.stringify(OPTIONS));
            this.renderEditor();
            UI.renderWheel();
            UI.showNotification('تم الإعادة', 'تم إعادة تعيين جميع الرموز', 'success');
        }
    },

    randomizeSymbols: function() {
        if (confirm('هل تريد توليد رموز عشوائية جديدة؟')) {
            const emojis = ['🍎', '🍌', '🍇', '🍓', '🍉', '🥭', '🍍', '🥝', '🍑', '🍒', '🥥', '🥑', '🍆', '🥔', '🧅', '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕'];
            
            state.customSymbols.forEach((symbol, index) => {
                const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                const randomMult = Math.floor(Math.random() * 20) + 5;
                const randomType = Math.random() > 0.5 ? 'vegetable' : 'meat';
                
                symbol.emoji = randomEmoji;
                symbol.mult = randomMult;
                symbol.type = randomType;
                symbol.name_ar = `عشوائي ${index + 1}`;
                symbol.name_en = `random_${index + 1}`;
                
                state.options[index] = { ...symbol };
            });

            this.renderEditor();
            UI.renderWheel();
            UI.showNotification('تم التوليد', 'تم توليد رموز عشوائية جديدة', 'success');
        }
    },

    exportSymbols: function() {
        const symbolsData = {
            regular: state.customSymbols,
            special: state.customSpecialSymbols,
            timestamp: new Date().toISOString()
        };

        const dataStr = JSON.stringify(symbolsData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const a = document.createElement('a');

        a.href = url;
        a.download = `game_symbols_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        UI.showNotification('تم التصدير', 'تم تصدير الرموز بنجاح', 'success');
    },

    importSymbols: function(file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            try {
                const imported = JSON.parse(e.target.result);
                if (imported.regular && imported.special) {
                    state.customSymbols = imported.regular;
                    state.options = JSON.parse(JSON.stringify(imported.regular));
                    state.customSpecialSymbols = imported.special;
                    
                    symbolCustomizer.renderEditor();
                    symbolCustomizer.renderSpecialSymbolsEditor();
                    UI.renderWheel();
                    UI.renderWinningOptions();
                    
                    UI.showNotification('تم الاستيراد', 'تم استيراد الرموز بنجاح', 'success');
                } else {
                    UI.showNotification('خطأ', 'ملف الرموز غير صالح', 'error');
                }
            } catch (error) {
                console.error('❌ خطأ في استيراد الرموز:', error);
                UI.showNotification('خطأ', 'ملف غير صالح', 'error');
            }
        };

        reader.readAsText(file);
    }
};

// ========== 10. نظام إدارة الرهانات ==========
const betManager = {
    placeSingleBet: function(optionId, amount) {
        const option = state.options.find(o => o.id === optionId);
        if (!option) {
            console.error('الخيار غير موجود:', optionId);
            UI.showNotification('خطأ', 'الخيار غير موجود', 'error');
            return false;
        }

        // التحقق من الحد الأقصى للخيارات في الوضع غير الحر
        if (!state.controlSettings.freeBetMode) {
            const currentBetsCount = Object.keys(state.currentBets).length;
            const maxOptions = state.controlSettings.maxBetOptions || 6;

            if (currentBetsCount >= maxOptions && !state.currentBets[option.emoji]) {
                UI.showNotification(
                    'حد الرهانات',
                    `لقد وصلت للحد الأقصى للرهانات (${maxOptions})`,
                    'warning'
                );
                return false;
            }
        }

        // التحقق من الرصيد
        if (amount > state.balance) {
            UI.showNotification('خطأ', 'رصيد غير كافي', 'error');
            return false;
        }

        // التحقق من الحد الأدنى والأقصى
        if (amount < state.bettingSettings.minBet) {
            UI.showNotification('خطأ', `الحد الأدنى للرهان هو ${state.bettingSettings.minBet}`, 'error');
            return false;
        }

        if (amount > state.bettingSettings.maxBet) {
            UI.showNotification('خطأ', `الحد الأقصى للرهان هو ${state.bettingSettings.maxBet}`, 'error');
            return false;
        }

        // إشعار تحذير المخاطرة
        if (state.settings.riskWarnings) {
            const riskWarning = riskAnalyzer.checkRiskWarning(amount);
            if (riskWarning.warning) {
                UI.showNotification('تحذير المخاطرة', riskWarning.message, 'warning');
            }
        }

        // تحديث الرهان
        if (!state.currentBets[option.emoji]) {
            state.currentBets[option.emoji] = 0;
        }

        state.currentBets[option.emoji] += amount;
        state.balance -= amount;

        // تحديث التوزيع الحالي
        if (!state.currentDistribution) {
            state.currentDistribution = {};
        }

        state.currentDistribution[option.emoji] = {
            amount: state.currentBets[option.emoji],
            type: option.type,
            potentialWin: state.currentBets[option.emoji] * option.mult,
            confidence: 0,
            strength: 'متوسطة',
            name: option.name_ar
        };

        audioSystem.playBetSound();
        UI.updateDashboard();

        setTimeout(() => {
            UI.renderWheel();
        }, 50);

        UI.updateDistributionPreview();

        UI.showNotification(
            'تم الرهان',
            `رهنت ${amount} على ${option.emoji} ${option.name_ar}`,
            'success'
        );

        return true;
    },

    clearSingleBet: function(optionId) {
        const option = state.options.find(o => o.id === optionId);
        if (!option) return false;

        const betAmount = state.currentBets[option.emoji];
        if (!betAmount || betAmount <= 0) return false;

        state.balance += betAmount;
        delete state.currentBets[option.emoji];

        if (state.currentDistribution && state.currentDistribution[option.emoji]) {
            delete state.currentDistribution[option.emoji];
        }

        if (Object.keys(state.currentDistribution || {}).length === 0) {
            state.currentDistribution = null;
        }

        UI.updateDashboard();
        UI.renderWheel();
        UI.updateDistributionPreview();

        UI.showNotification('تم المسح', `تم استعادة ${betAmount} نقطة`, 'success');
        return true;
    },

    getBetAmount: function(optionId) {
        const option = state.options.find(o => o.id === optionId);
        if (!option) return 0;
        return state.currentBets[option.emoji] || 0;
    },

    clearAllBets: function() {
        const totalAmount = Object.values(state.currentBets).reduce((sum, amount) => sum + amount, 0);

        if (totalAmount > 0) {
            state.balance += totalAmount;
            state.currentBets = {};
            state.currentDistribution = null;

            UI.updateDashboard();
            UI.renderWheel();
            UI.updateDistributionPreview();

            UI.showNotification('تم المسح', `تم استعادة ${totalAmount} نقطة`, 'success');
            return true;
        }
        return false;
    },

    autoPlaceBets: function() {
        if (!state.controlSettings.autoBetting) return false;

        const predictions = predictionEngine.generateProBar();
        if (predictions.length === 0) return false;

        const amount = parseInt(document.getElementById('betAmount').value) || 100;
        const distribution = distributionSystem.distribute(amount, state.distribution.type);

        if (distribution) {
            UI.showNotification('مراهنة تلقائية', 'تم المراهنة تلقائياً بناءً على التنبؤات', 'info');
            return true;
        }

        return false;
    }
};

// ========== 11. نظام إدارة الإعدادات ==========
const settingsManager = {
    saveSettings: function() {
        try {
            // حفظ إعدادات لوحة التحكم
            state.controlSettings = {
                smartControl: document.getElementById('smartControlToggle')?.checked || false,
                autoDistribute: document.getElementById('autoDistributeToggle')?.checked || false,
                autoBetting: document.getElementById('autoBettingToggle')?.checked || false,
                riskControl: document.getElementById('riskControlToggle')?.checked || true,
                freeBetMode: document.getElementById('freeBetModeToggle')?.checked || true,
                maxBetOptions: parseInt(document.getElementById('maxOptionsSlider')?.value || 6),
                minBet: parseInt(document.getElementById('minBetAmount')?.value || 10),
                maxBet: parseInt(document.getElementById('maxBetAmount')?.value || 1000),
                autoBackup: document.getElementById('autoBackupToggle')?.checked || false,
                backupInterval: parseInt(document.getElementById('backupInterval')?.value || 5)
            };

            // حفظ إعدادات الصوت
            state.settings.sound = document.getElementById('soundToggle')?.checked || true;
            state.settings.autoSoundProBar = document.getElementById('autoSoundToggle')?.checked || true;
            state.settings.autoWinSound = document.getElementById('winSoundToggle')?.checked || true;
            state.settings.repeatCount = parseInt(document.getElementById('repeatCountSelect')?.value || 2);
            state.settings.voiceType = document.getElementById('voiceTypeSelect')?.value || 'male';
            
            // حجم الصوت
            const volumeSlider = document.getElementById('volumeSlider');
            if (volumeSlider) {
                state.settings.volume = parseInt(volumeSlider.value);
                audioSystem.setVolume(state.settings.volume / 100);
            }

            // حفظ إعدادات النسخ الاحتياطي
            state.backup.enabled = document.getElementById('autoBackupToggle')?.checked || false;
            state.backup.settings.winner = document.getElementById('saveWinnerData')?.checked || true;
            state.backup.settings.predictions = document.getElementById('savePredictions')?.checked || true;
            state.backup.settings.bets = document.getElementById('saveBets')?.checked || true;
            state.backup.settings.stats = document.getElementById('saveStats')?.checked || true;
            state.backup.settings.patterns = document.getElementById('savePatterns')?.checked || true;
            state.backup.settings.settings = document.getElementById('saveSettings')?.checked || true;

            // حفظ التخصيصات
            const themeSelect = document.getElementById('themeSelect');
            if (themeSelect) state.settings.theme = themeSelect.value;

            const densitySelect = document.getElementById('densitySelect');
            if (densitySelect) {
                state.settings.density = densitySelect.value;
                this.applyDensitySettings();
            }

            const barsStyleSelect = document.getElementById('barsStyleSelect');
            if (barsStyleSelect) state.settings.barsStyle = barsStyleSelect.value;

            const themeColor = document.getElementById('themeColor');
            if (themeColor) state.settings.themeColor = themeColor.value;

            // حفظ إعدادات اللعبة
            state.settings.showAnimations = document.getElementById('showAnimations')?.checked || true;
            state.settings.showTooltips = document.getElementById('showTooltips')?.checked || true;
            state.settings.autoSave = document.getElementById('autoSaveGame')?.checked || true;
            state.settings.notifications = document.getElementById('notificationsEnabled')?.checked || true;
            state.settings.confirmActions = document.getElementById('confirmActions')?.checked || true;
            state.settings.showPredictions = document.getElementById('showPredictions')?.checked || true;

            // حفظ إحصائيات متقدمة
            const statsDisplay = document.getElementById('statsDisplay');
            if (statsDisplay) state.settings.statsDisplay = statsDisplay.value;

            const statsRefresh = document.getElementById('statsRefresh');
            if (statsRefresh) state.settings.statsRefresh = parseInt(statsRefresh.value);

            // حفظ إعدادات متقدمة
            const graphicsQuality = document.getElementById('graphicsQuality');
            if (graphicsQuality) state.settings.graphicsQuality = graphicsQuality.value;

            const refreshRate = document.getElementById('refreshRate');
            if (refreshRate) state.settings.refreshRate = parseInt(refreshRate.value);

            const aiLevel = document.getElementById('aiLevel');
            if (aiLevel) state.settings.aiLevel = parseInt(aiLevel.value);

            const learningRateSlider = document.getElementById('learningRateSlider');
            if (learningRateSlider) state.settings.learningRate = parseInt(learningRateSlider.value);

            const memorySizeSlider = document.getElementById('memorySizeSlider');
            if (memorySizeSlider) state.settings.memorySize = parseInt(memorySizeSlider.value);

            const cacheSizeSlider = document.getElementById('cacheSizeSlider');
            if (cacheSizeSlider) state.system.cacheSize = parseInt(cacheSizeSlider.value);

            state.settings.deepLearning = document.getElementById('deepLearningToggle')?.checked || true;
            state.settings.enableExperimental = document.getElementById('enableExperimental')?.checked || false;
            state.settings.enableDebug = document.getElementById('enableDebug')?.checked || false;
            state.settings.enableLogging = document.getElementById('enableLogging')?.checked || false;
            state.settings.enableAnalytics = document.getElementById('enableAnalytics')?.checked || false;

            // تحديث قيمة الحد الأقصى للخيارات
            const maxOptionsValue = document.getElementById('maxOptionsValue');
            if (maxOptionsValue) {
                maxOptionsValue.textContent = state.controlSettings.maxBetOptions;
            }

            // تحديث الأشرطة
            state.distribution.maxOptions = state.controlSettings.maxBetOptions;
            state.distribution.freeBetMode = state.controlSettings.freeBetMode;
            state.distribution.currentMaxOptions = state.controlSettings.maxBetOptions;

            state.bettingSettings.minBet = state.controlSettings.minBet;
            state.bettingSettings.maxBet = state.controlSettings.maxBet;
            state.bettingSettings.maxOptions = state.controlSettings.maxBetOptions;

            // حفظ الرموز المخصصة
            state.customSymbols = JSON.parse(JSON.stringify(state.options));
            state.customSpecialSymbols = JSON.parse(JSON.stringify(SPECIAL_SYMBOLS));

            // حفظ في localStorage
            localStorage.setItem('SMART_PREDICTION_SETTINGS_V4', JSON.stringify({
                controlSettings: state.controlSettings,
                settings: state.settings,
                customSymbols: state.customSymbols,
                customSpecialSymbols: state.customSpecialSymbols,
                backup: state.backup,
                distribution: state.distribution,
                bettingSettings: state.bettingSettings,
                system: state.system
            }));

            // تحديث واجهة المستخدم
            UI.updateControlBadges();
            audioSystem.isMuted = !state.settings.sound;
            audioSystem.updateMuteButton();

            // تحديث النظام الصوتي إذا تغير نوع الصوت
            const voiceType = document.getElementById('voiceTypeSelect')?.value;
            if (voiceType && voiceType !== state.settings.voiceType) {
                state.settings.voiceType = voiceType;
                audioSystem.loadAudioFiles();
            }

            // تحديث كثافة العرض
            this.applyDensitySettings();

            // تحديث حالة الحفظ
            const saveStatus = document.getElementById('saveStatus');
            if (saveStatus) {
                saveStatus.innerHTML = '<i class="fas fa-check-circle"></i><span>تم حفظ جميع التعديلات</span>';
                saveStatus.style.background = 'rgba(40, 167, 69, 0.1)';
                saveStatus.style.borderColor = 'rgba(40, 167, 69, 0.2)';
                saveStatus.style.color = '#28a745';
                
                setTimeout(() => {
                    saveStatus.innerHTML = '<i class="fas fa-info-circle"></i><span>جميع التعديلات محفوظة</span>';
                }, 3000);
            }

            // حفظ الحالة الكاملة
            UI.saveState();

            return true;
        } catch (error) {
            console.error('❌ خطأ في حفظ الإعدادات:', error);
            return false;
        }
    },

    loadSettings: function() {
        try {
            const saved = localStorage.getItem('SMART_PREDICTION_SETTINGS_V4');
            if (saved) {
                const settings = JSON.parse(saved);

                // تحميل إعدادات لوحة التحكم
                if (settings.controlSettings) {
                    state.controlSettings = { ...state.controlSettings, ...settings.controlSettings };
                }

                // تحميل إعدادات المستخدم
                if (settings.settings) {
                    state.settings = { ...state.settings, ...settings.settings };
                }

                // تحميل الرموز المخصصة
                if (settings.customSymbols) {
                    state.customSymbols = settings.customSymbols;
                    state.options = JSON.parse(JSON.stringify(settings.customSymbols));
                }

                if (settings.customSpecialSymbols) {
                    state.customSpecialSymbols = settings.customSpecialSymbols;
                    // تحديث SPECIAL_SYMBOLS
                    SPECIAL_SYMBOLS.length = 0;
                    SPECIAL_SYMBOLS.push(...settings.customSpecialSymbols);
                }

                // تحميل إعدادات النسخ الاحتياطي
                if (settings.backup) {
                    state.backup = { ...state.backup, ...settings.backup };
                }

                // تحميل إعدادات التوزيع
                if (settings.distribution) {
                    state.distribution = { ...state.distribution, ...settings.distribution };
                }

                // تحميل إعدادات الرهان
                if (settings.bettingSettings) {
                    state.bettingSettings = { ...state.bettingSettings, ...settings.bettingSettings };
                }

                // تحميل إعدادات النظام
                if (settings.system) {
                    state.system = { ...state.system, ...settings.system };
                }
            }
        } catch (error) {
            console.error('❌ خطأ في تحميل الإعدادات:', error);
        }
    },

    applySettingsToUI: function() {
        console.log('🔧 جاري تطبيق الإعدادات على الواجهة...');

        // تطبيق إعدادات لوحة التحكم
        const smartToggle = document.getElementById('smartControlToggle');
        if (smartToggle) smartToggle.checked = state.controlSettings.smartControl;

        const autoToggle = document.getElementById('autoDistributeToggle');
        if (autoToggle) autoToggle.checked = state.controlSettings.autoDistribute;

        const autoBettingToggle = document.getElementById('autoBettingToggle');
        if (autoBettingToggle) autoBettingToggle.checked = state.controlSettings.autoBetting;

        const riskToggle = document.getElementById('riskControlToggle');
        if (riskToggle) riskToggle.checked = state.controlSettings.riskControl;

        const freeBetToggle = document.getElementById('freeBetModeToggle');
        if (freeBetToggle) freeBetToggle.checked = state.controlSettings.freeBetMode;

        const maxSlider = document.getElementById('maxOptionsSlider');
        if (maxSlider) maxSlider.value = state.controlSettings.maxBetOptions;

        const maxValue = document.getElementById('maxOptionsValue');
        if (maxValue) maxValue.textContent = state.controlSettings.maxBetOptions;

        const minBetInput = document.getElementById('minBetAmount');
        if (minBetInput) minBetInput.value = state.controlSettings.minBet || 10;

        const maxBetInput = document.getElementById('maxBetAmount');
        if (maxBetInput) maxBetInput.value = state.controlSettings.maxBet || 1000;

        const backupToggle = document.getElementById('autoBackupToggle');
        if (backupToggle) backupToggle.checked = state.controlSettings.autoBackup;

        const backupInterval = document.getElementById('backupInterval');
        if (backupInterval) backupInterval.value = state.controlSettings.backupInterval || 5;

        // تطبيق إعدادات الصوت
        const soundToggle = document.getElementById('soundToggle');
        if (soundToggle) soundToggle.checked = state.settings.sound;

        const autoSoundToggle = document.getElementById('autoSoundToggle');
        if (autoSoundToggle) autoSoundToggle.checked = state.settings.autoSoundProBar;

        const winSoundToggle = document.getElementById('winSoundToggle');
        if (winSoundToggle) winSoundToggle.checked = state.settings.autoWinSound;

        const repeatSelect = document.getElementById('repeatCountSelect');
        if (repeatSelect) repeatSelect.value = state.settings.repeatCount.toString();

        const voiceSelect = document.getElementById('voiceTypeSelect');
        if (voiceSelect) voiceSelect.value = state.settings.voiceType;

        const volumeSlider = document.getElementById('volumeSlider');
        if (volumeSlider) {
            volumeSlider.value = state.settings.volume || 80;
            const volumeValue = document.getElementById('volumeValue');
            if (volumeValue) volumeValue.textContent = (state.settings.volume || 80) + '%';
        }

        // تطبيق إعدادات النسخ الاحتياطي
        const saveWinner = document.getElementById('saveWinnerData');
        if (saveWinner) saveWinner.checked = state.backup.settings.winner;

        const savePredictions = document.getElementById('savePredictions');
        if (savePredictions) savePredictions.checked = state.backup.settings.predictions;

        const saveBets = document.getElementById('saveBets');
        if (saveBets) saveBets.checked = state.backup.settings.bets;

        const saveStats = document.getElementById('saveStats');
        if (saveStats) saveStats.checked = state.backup.settings.stats;

        const savePatterns = document.getElementById('savePatterns');
        if (savePatterns) savePatterns.checked = state.backup.settings.patterns;

        const saveSettings = document.getElementById('saveSettings');
        if (saveSettings) saveSettings.checked = state.backup.settings.settings;

        // تطبيق التخصيصات
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) themeSelect.value = state.settings.theme;

        const densitySelect = document.getElementById('densitySelect');
        if (densitySelect) densitySelect.value = state.settings.density;

        const barsStyleSelect = document.getElementById('barsStyleSelect');
        if (barsStyleSelect) barsStyleSelect.value = state.settings.barsStyle;

        const themeColor = document.getElementById('themeColor');
        if (themeColor) themeColor.value = state.settings.themeColor;

        // تطبيق إعدادات اللعبة
        const showAnimations = document.getElementById('showAnimations');
        if (showAnimations) showAnimations.checked = state.settings.showAnimations;

        const showTooltips = document.getElementById('showTooltips');
        if (showTooltips) showTooltips.checked = state.settings.showTooltips;

        const autoSave = document.getElementById('autoSaveGame');
        if (autoSave) autoSave.checked = state.settings.autoSave;

        const notifications = document.getElementById('notificationsEnabled');
        if (notifications) notifications.checked = state.settings.notifications;

        const confirmActions = document.getElementById('confirmActions');
        if (confirmActions) confirmActions.checked = state.settings.confirmActions;

        const showPredictions = document.getElementById('showPredictions');
        if (showPredictions) showPredictions.checked = state.settings.showPredictions;

        // تطبيق إحصائيات متقدمة
        const statsDisplay = document.getElementById('statsDisplay');
        if (statsDisplay) statsDisplay.value = state.settings.statsDisplay;

        const statsRefresh = document.getElementById('statsRefresh');
        if (statsRefresh) statsRefresh.value = state.settings.statsRefresh.toString();

        // تطبيق إعدادات متقدمة
        const graphicsQuality = document.getElementById('graphicsQuality');
        if (graphicsQuality) graphicsQuality.value = state.settings.graphicsQuality;

        const refreshRate = document.getElementById('refreshRate');
        if (refreshRate) refreshRate.value = state.settings.refreshRate.toString();

        const aiLevel = document.getElementById('aiLevel');
        if (aiLevel) aiLevel.value = state.settings.aiLevel.toString();

        const learningRateSlider = document.getElementById('learningRateSlider');
        if (learningRateSlider) learningRateSlider.value = state.settings.learningRate;

        const learningRateValue = document.getElementById('learningRateValue');
        if (learningRateValue) learningRateValue.textContent = state.settings.learningRate + '%';

        const memorySizeSlider = document.getElementById('memorySizeSlider');
        if (memorySizeSlider) memorySizeSlider.value = state.settings.memorySize;

        const memorySizeValue = document.getElementById('memorySizeValue');
        if (memorySizeValue) memorySizeValue.textContent = state.settings.memorySize + ' سجل';

        const cacheSizeSlider = document.getElementById('cacheSizeSlider');
        if (cacheSizeSlider) cacheSizeSlider.value = state.system.cacheSize;

        const cacheSizeValue = document.getElementById('cacheSizeValue');
        if (cacheSizeValue) cacheSizeValue.textContent = state.system.cacheSize + ' MB';

        const deepLearningToggle = document.getElementById('deepLearningToggle');
        if (deepLearningToggle) deepLearningToggle.checked = state.settings.deepLearning;

        const enableExperimental = document.getElementById('enableExperimental');
        if (enableExperimental) enableExperimental.checked = state.settings.enableExperimental;

        const enableDebug = document.getElementById('enableDebug');
        if (enableDebug) enableDebug.checked = state.settings.enableDebug;

        const enableLogging = document.getElementById('enableLogging');
        if (enableLogging) enableLogging.checked = state.settings.enableLogging;

        const enableAnalytics = document.getElementById('enableAnalytics');
        if (enableAnalytics) enableAnalytics.checked = state.settings.enableAnalytics;

        // تحديث شاشات العرض
        UI.updateControlBadges();
        audioSystem.isMuted = !state.settings.sound;
        audioSystem.updateMuteButton();

        // تطبيق كثافة العرض
        this.applyDensitySettings();

        console.log('✅ تم تطبيق جميع الإعدادات على الواجهة');
    },

    applyDensitySettings: function() {
        const appContainer = document.querySelector('.app-container');
        if (!appContainer) return;

        // إزالة جميع أصناف الكثافة
        appContainer.classList.remove('density-compact', 'density-normal', 'density-comfortable');
        
        // إضافة الصنف المحدد
        appContainer.classList.add(`density-${state.settings.density || 'normal'}`);

        // تحديث حجم الخط إذا لزم الأمر
        const density = state.settings.density;
        if (density === 'compact') {
            document.body.style.fontSize = '13px';
        } else if (density === 'comfortable') {
            document.body.style.fontSize = '15px';
        } else {
            document.body.style.fontSize = '14px';
        }
    },

    resetToDefaults: function() {
        if (confirm('هل تريد إعادة تعيين جميع الإعدادات إلى الحالة الافتراضية؟')) {
            localStorage.removeItem('SMART_PREDICTION_SETTINGS_V4');
            
            // إعادة تعيين الحالة
            state.controlSettings = {
                smartControl: true,
                autoDistribute: false,
                autoBetting: false,
                riskControl: true,
                freeBetMode: true,
                maxBetOptions: 6,
                minBet: 10,
                maxBet: 1000,
                autoBackup: false,
                backupInterval: 5
            };

            state.settings = {
                sound: true,
                notifications: true,
                autoSave: true,
                riskWarnings: true,
                autoSoundProBar: true,
                autoWinSound: true,
                repeatCount: 2,
                voiceType: 'male',
                volume: 80,
                theme: 'light',
                density: 'normal',
                barsStyle: 'default',
                themeColor: '#0b66ff',
                showAnimations: true,
                showTooltips: true,
                showPredictions: true,
                confirmActions: true,
                wheelAnimations: true,
                smartPredictions: true,
                animationSpeed: 'normal',
                statsDisplay: 'detailed',
                statsRefresh: 5,
                graphicsQuality: 'medium',
                refreshRate: 60,
                aiLevel: 2,
                learningRate: 50,
                memorySize: 100,
                deepLearning: true,
                enableExperimental: false,
                enableDebug: false,
                enableLogging: false,
                enableAnalytics: false
            };

            this.applySettingsToUI();
            UI.showNotification('تم الإعادة', 'تم إعادة تعيين جميع الإعدادات إلى الحالة الافتراضية', 'success');
        }
    }
};

// ========== 12. دوال المساعدة العامة ==========
function resetGame() {
    if (state.settings.confirmActions) {
        if (!confirm('هل تريد إعادة تعيين اللعبة؟ سيتم فقدان جميع البيانات الحالية.')) {
            return;
        }
    }

    state.balance = 1000;
    state.totalWins = 0;
    state.totalLosses = 0;
    state.sessionWins = 0;
    state.sessionLosses = 0;
    state.totalSpins = 0;
    state.history = [];
    state.sessionHistory = [];
    state.patternMemory = [];
    state.spinHistory = [];
    state.currentBets = {};
    state.currentDistribution = null;
    state.proBar = {
        hits: 0,
        misses: 0,
        streak: 0,
        bestStreak: 0,
        accuracy: 0
    };
    state.consensus = {
        hits: 0,
        misses: 0,
        accuracy: 0
    };
    state.bars = {
        hits: 0,
        misses: 0,
        accuracy: 0
    };
    state.accuracy = {
        classic: 0,
        markov: 0,
        reverse: 0,
        advanced: 0,
        consensus: 0,
        pro: 0,
        bars: 0
    };

    // إعادة تعيين الجلسة
    state.session = {
        startTime: Date.now(),
        duration: 0,
        streak: 0,
        accuracy: 0,
        hotStreak: 0
    };

    // إعادة تعيين الذاكرة
    aiMemorySystem.init();

    // إعادة تعيين التنبؤات
    predictionEngine.clearPredictions();

    // حفظ الحالة
    UI.saveState();

    // إعادة التصيير
    UI.renderAll();

    UI.showNotification('تم إعادة التعيين', 'تمت إعادة تعيين اللعبة بنجاح', 'success');
}

function addBalance(amount = 500) {
    state.balance += amount;
    UI.updateDashboard();
    UI.saveState();

    UI.showNotification('تمت الإضافة', `تم إضافة ${amount} نقطة إلى رصيدك`, 'success');
}

function removeLastResult() {
    if (state.history.length === 0) {
        UI.showNotification('لا توجد نتائج', 'لا توجد نتائج لحذفها', 'warning');
        return;
    }

    if (state.settings.confirmActions) {
        if (!confirm('هل تريد حذف آخر نتيجة؟')) {
            return;
        }
    }

    const lastResult = state.history[0];
    state.history.shift();

    // استعادة الرصيد إذا كانت نتيجة فوز
    if (lastResult.winAmount > 0) {
        state.balance -= lastResult.winAmount;
        state.totalWins--;
        state.sessionWins--;
    } else {
        state.totalLosses--;
        state.sessionLosses--;
    }

    UI.saveState();
    UI.renderAll();

    UI.showNotification('تم الحذف', 'تم حذف آخر نتيجة بنجاح', 'info');
}

function reorderWheel() {
    if (state.settings.confirmActions) {
        if (!confirm('هل تريد إعادة ترتيب الرموز عشوائياً؟')) {
            return;
        }
    }

    // خلط الرموز عشوائياً
    const shuffled = [...state.options].sort(() => Math.random() - 0.5);
    state.options = shuffled;

    // تحديث الرموز المخصصة
    state.customSymbols = JSON.parse(JSON.stringify(shuffled));

    // إعادة تصيير العجلة
    UI.renderWheel();

    UI.showNotification('تم إعادة الترتيب', 'تمت إعادة ترتيب الرموز عشوائياً', 'success');
}

function forceWin() {
    if (state.settings.confirmActions) {
        if (!confirm('هل تريد فرض فوز عشوائي؟')) {
            return;
        }
    }

    const randomIndex = Math.floor(Math.random() * state.options.length);
    const randomOption = state.options[randomIndex];
    UI.declareWinner(randomOption.id);
}

function unlockAllFeatures() {
    if (state.settings.confirmActions) {
        if (!confirm('هل تريد فتح جميع المميزات الخاصة؟')) {
            return;
        }
    }

    state.balance += 5000;
    state.controlSettings.freeBetMode = true;
    state.controlSettings.maxBetOptions = 8;
    state.bettingSettings.maxBet = 5000;
    
    // تفعيل جميع المميزات
    state.settings.smartPredictions = true;
    state.settings.deepLearning = true;
    state.settings.enableExperimental = true;
    
    settingsManager.applySettingsToUI();
    UI.updateDashboard();
    
    UI.showNotification('تم فتح المميزات', 'تم فتح جميع المميزات الخاصة وإضافة 5000 نقطة', 'success');
}

function closeBackupModal() {
    const modal = document.getElementById('backupModal');
    if (modal) modal.classList.remove('active');
}

function closeReportsModal() {
    const modal = document.getElementById('reportsModal');
    if (modal) modal.classList.remove('active');
}

function closeHelpModal() {
    const modal = document.getElementById('helpModal');
    if (modal) modal.classList.remove('active');
}

function showHelp() {
    const modal = document.getElementById('helpModal');
    const content = document.getElementById('helpContent');
    
    if (!modal || !content) return;
    
    content.innerHTML = `
        <div class="help-section">
            <h4><i class="fas fa-gamepad"></i> كيفية اللعب</h4>
            <p>1. اختر رمزاً من العجلة للرهان عليه</p>
            <p>2. اضغط على أيقونة الكأس في وسط العجلة للفوز</p>
            <p>3. استخدم أشرطة التنبؤ لتوقع النتائج القادمة</p>
            <p>4. استخدم نظام التوزيع الذكي للمراهنة الذكية</p>
        </div>
        
        <div class="help-section">
            <h4><i class="fas fa-cogs"></i> لوحة التحكم</h4>
            <p><strong>التحكم:</strong> إعدادات النظام الذكي والرهان</p>
            <p><strong>الصوت:</strong> إعدادات الصوت والإشعارات</p>
            <p><strong>الرموز:</strong> تخصيص رموز العجلة</p>
            <p><strong>النسخ:</strong> النسخ الاحتياطي والاستعادة</p>
            <p><strong>الإعدادات:</strong> تخصيص الواجهة والإعدادات العامة</p>
            <p><strong>متقدم:</strong> إعدادات الذكاء الاصطناعي والأداء</p>
        </div>
        
        <div class="help-section">
            <h4><i class="fas fa-lightbulb"></i> نصائح ذكية</h4>
            <p>• راقب مستوى المخاطرة قبل الرهان الكبير</p>
            <p>• استخدم التنبؤات الذكية لزيادة فرص الفوز</p>
            <p>• جرب أنواع توزيع مختلفة حسب مستوى المخاطرة</p>
            <p>• احفظ تقدمك بانتظام باستخدام النسخ الاحتياطي</p>
            <p>• استخدم الوضع المضغوط لرؤية المزيد من المعلومات</p>
        </div>
        
        <div class="help-section">
            <h4><i class="fas fa-chart-line"></i> الإحصائيات</h4>
            <p><strong>الدقة:</strong> نسبة توقع النماذج الذكية</p>
            <p><strong>السلسلة:</strong> عدد مرات الفوز المتتالي</p>
            <p><strong>المخاطرة:</strong> مستوى المخاطرة الحالي للرهان</p>
            <p><strong>الإجماع:</strong> نتيجة توقع جميع النماذج معاً</p>
        </div>
    `;
    
    modal.classList.add('active');
}

// ========== 13. واجهة المستخدم المحسنة ==========
const UI = {
    init: function() {
        console.log('🚀 تهيئة النظام الذكي للتنبؤ المحسن...');

        try {
            // تحميل الحالة المحفوظة
            this.loadState();

            // تحميل الإعدادات
            settingsManager.loadSettings();

            // تهيئة الذاكرة
            aiMemorySystem.init();

            // تطبيق الإعدادات على واجهة المستخدم
            settingsManager.applySettingsToUI();

            // إعداد لوحة التحكم
            this.setupControlPanel();

            // إعداد مستمعي الأحداث
            this.setupEventListeners();

            // تهيئة النظام الصوتي
            audioSystem.init();

            // عرض جميع العناصر
            this.renderAll();
            this.updateDashboard();

            // تحديث المخاطر
            riskAnalyzer.updateRiskBadge();

            // بدء المؤقتات
            this.startTimers();

            // تحديث معلومات النسخ الاحتياطي
            backupSystem.updateBackupInfo();

            console.log('✅ تم تهيئة النظام بنجاح');

            setTimeout(() => {
                this.showNotification('🎮 نظام التوقع الذكي جاهز', 'تم تحميل جميع المميزات بنجاح. استمتع باللعبة!', 'success');
            }, 1000);

        } catch (error) {
            console.error('❌ خطأ في تهيئة النظام:', error);
            this.showNotification('خطأ في التحميل', 'حدث خطأ في تحميل النظام. يرجى تحديث الصفحة.', 'error');
        }
    },

    saveState: function() {
        if (!state.settings.autoSave) return false;

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                balance: state.balance,
                totalWins: state.totalWins,
                totalLosses: state.totalLosses,
                totalSpins: state.totalSpins,
                history: state.history,
                proBar: state.proBar,
                consensus: state.consensus,
                bars: state.bars,
                accuracy: state.accuracy,
                currentBets: state.currentBets,
                currentDistribution: state.currentDistribution,
                aiMemory: state.aiMemory,
                session: state.session,
                version: state.version
            }));
            return true;
        } catch (error) {
            console.error('❌ خطأ في حفظ الحالة:', error);
            return false;
        }
    },

    loadState: function() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const loaded = JSON.parse(saved);

                if (loaded.version === AI_MODEL_VERSION) {
                    state.balance = loaded.balance || 1000;
                    state.totalWins = loaded.totalWins || 0;
                    state.totalLosses = loaded.totalLosses || 0;
                    state.totalSpins = loaded.totalSpins || 0;
                    state.history = loaded.history || [];
                    state.proBar = loaded.proBar || state.proBar;
                    state.consensus = loaded.consensus || state.consensus;
                    state.bars = loaded.bars || state.bars;
                    state.accuracy = loaded.accuracy || state.accuracy;
                    state.currentBets = loaded.currentBets || {};
                    state.currentDistribution = loaded.currentDistribution || null;
                    state.aiMemory = loaded.aiMemory || state.aiMemory;
                    state.session = loaded.session || state.session;

                    console.log('✅ تم تحميل حالة اللعبة السابقة');
                }
            }
        } catch (error) {
            console.error('❌ خطأ في تحميل الحالة:', error);
        }
    },

    setupControlPanel: function() {
        console.log('🔧 جاري إعداد لوحة التحكم...');

        // زر فتح/إغلاق اللوحة الرئيسي
        const panelToggleBtn = document.getElementById('panelToggleBtn');
        if (panelToggleBtn) {
            panelToggleBtn.addEventListener('click', () => {
                this.toggleControlPanel();
            });
        }

        // زر الإغلاق داخل اللوحة
        const panelCloseBtn = document.getElementById('panelCloseBtn');
        if (panelCloseBtn) {
            panelCloseBtn.addEventListener('click', () => {
                this.closeControlPanel();
            });
        }

        // إغلاق اللوحة عند النقر خارجها
        document.addEventListener('click', (e) => {
            const panel = document.getElementById('controlPanel');
            const toggleBtn = document.getElementById('panelToggleBtn');

            if (panel && panel.classList.contains('active')) {
                if (!panel.contains(e.target) && toggleBtn && !toggleBtn.contains(e.target)) {
                    this.closeControlPanel();
                }
            }
        });

        // إغلاق اللوحة عند الضغط على مفتاح Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeControlPanel();
            }
        });

        console.log('✅ تم إعداد لوحة التحكم');
    },

    setupEventListeners: function() {
        console.log('🔧 جاري إعداد مستمعي الأحداث...');

        // إعداد أزرار التبويبات
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabId = e.target.getAttribute('data-tab');

                // إزالة النشاط من جميع الأزرار
                tabButtons.forEach(b => b.classList.remove('active'));

                // إضافة النشاط للزر المضغوط
                e.target.classList.add('active');

                // إخفاء جميع المحتويات
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });

                // إظهار المحتوى المطلوب
                const targetTab = document.getElementById(tabId + 'Tab');
                if (targetTab) {
                    targetTab.classList.add('active');

                    // إذا كان تبويب الرموز، عرض المحرر
                    if (tabId === 'symbols') {
                        symbolCustomizer.renderEditor();
                        symbolCustomizer.renderSpecialSymbolsEditor();
                    }
                    
                    // إذا كان تبويب المتقدم، تحديث معلومات النظام
                    if (tabId === 'advanced') {
                        this.updateSystemInfo();
                    }
                }
            });
        });

        // إعداد أزرار حفظ وتراجع وإعادة تعيين
        const saveSettingsBtn = document.getElementById('saveSettingsBtn');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => {
                if (settingsManager.saveSettings()) {
                    this.showNotification('تم الحفظ', 'تم حفظ جميع الإعدادات بنجاح', 'success');
                }
            });
        }

        const cancelChangesBtn = document.getElementById('cancelChangesBtn');
        if (cancelChangesBtn) {
            cancelChangesBtn.addEventListener('click', () => {
                if (state.settings.confirmActions) {
                    if (!confirm('هل تريد التراجع عن جميع التغييرات غير المحفوظة؟')) {
                        return;
                    }
                }
                settingsManager.applySettingsToUI();
                this.showNotification('تم التراجع', 'تم التراجع عن جميع التغييرات', 'info');
            });
        }

        const defaultSettingsBtn = document.getElementById('defaultSettingsBtn');
        if (defaultSettingsBtn) {
            defaultSettingsBtn.addEventListener('click', () => {
                settingsManager.resetToDefaults();
            });
        }

        // إعداد السلايدرات
        const maxOptionsSlider = document.getElementById('maxOptionsSlider');
        if (maxOptionsSlider) {
            maxOptionsSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                const maxValue = document.getElementById('maxOptionsValue');
                if (maxValue) {
                    maxValue.textContent = value;
                }
            });
        }

        const volumeSlider = document.getElementById('volumeSlider');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                const value = e.target.value;
                const volumeValue = document.getElementById('volumeValue');
                if (volumeValue) {
                    volumeValue.textContent = value + '%';
                }
            });
        }

        // إعداد أزرار التنبؤ الصوتية
        document.querySelectorAll('.sound-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const barType = e.target.closest('.sound-btn').dataset.bar;
                this.playBarSound(barType);
            });
        });

        // إعداد زر تدوير العجلة
        const spinWheelBtn = document.getElementById('spinWheelBtn');
        if (spinWheelBtn) {
            spinWheelBtn.addEventListener('click', () => {
                this.spinWheel();
            });
        }

        // إعداد زر إيقاف العجلة
        const stopWheelBtn = document.getElementById('stopWheelBtn');
        if (stopWheelBtn) {
            stopWheelBtn.addEventListener('click', () => {
                this.stopWheel();
            });
        }

        // إعداد زر العجلة العشوائية
        const randomWinnerBtn = document.getElementById('randomWinnerBtn');
        if (randomWinnerBtn) {
            randomWinnerBtn.addEventListener('click', () => {
                const randomIndex = Math.floor(Math.random() * state.options.length);
                const randomOption = state.options[randomIndex];
                this.showWinnerConfirmation(randomOption);
            });
        }

        // إعداد زر توزيع ذكي
        const distributeBtn = document.getElementById('distributeBtn');
        if (distributeBtn) {
            distributeBtn.addEventListener('click', () => {
                const amount = parseInt(document.getElementById('betAmount').value) || 100;
                const type = document.getElementById('distributionType').value;

                const distribution = distributionSystem.distribute(amount, type);
                if (distribution) {
                    this.showNotification('تم التوزيع', `تم توزيع ${amount} نقطة`, 'success');
                }
            });
        }

        // إعداد زر التوزيع التلقائي
        const autoDistributeBtn = document.getElementById('autoDistributeBtn');
        if (autoDistributeBtn) {
            autoDistributeBtn.addEventListener('click', () => {
                state.controlSettings.autoDistribute = !state.controlSettings.autoDistribute;
                this.updateControlBadges();
                this.showNotification(
                    'التوزيع التلقائي',
                    state.controlSettings.autoDistribute ? 'مفعل' : 'متوقف',
                    'info'
                );
            });
        }

        // إعداد زر التوزيع الذكي
        const smartDistributeBtn = document.getElementById('smartDistributeBtn');
        if (smartDistributeBtn) {
            smartDistributeBtn.addEventListener('click', () => {
                const amount = parseInt(document.getElementById('betAmount').value) || 100;
                const distribution = distributionSystem.distribute(amount, 'pattern');
                if (distribution) {
                    this.showNotification('التوزيع الذكي', 'تم التوزيع حسب الأنماط المتعلمة', 'success');
                }
            });
        }

        // إعداد زر مسح الرهانات
        const clearBetsBtn = document.getElementById('clearBetsBtn');
        if (clearBetsBtn) {
            clearBetsBtn.addEventListener('click', () => {
                distributionSystem.clearDistribution();
            });
        }

        // إعداد زر الصوت الرئيسي
        const toggleSoundBtn = document.getElementById('toggleSoundBtn');
        if (toggleSoundBtn) {
            toggleSoundBtn.addEventListener('click', () => {
                audioSystem.toggleMute();
            });
        }

        // إعداد الخيارات السريعة
        this.setupQuickActions();

        // إعداد أزرار التحكم في الوزن
        const vegWeightSlider = document.getElementById('vegWeight');
        const meatWeightSlider = document.getElementById('meatWeight');

        if (vegWeightSlider && meatWeightSlider) {
            vegWeightSlider.addEventListener('input', (e) => {
                const vegValue = parseInt(e.target.value);
                const meatValue = 100 - vegValue;

                meatWeightSlider.value = meatValue;

                const vegWeightValue = document.getElementById('vegWeightValue');
                const meatWeightValue = document.getElementById('meatWeightValue');

                if (vegWeightValue) vegWeightValue.textContent = vegValue + '%';
                if (meatWeightValue) meatWeightValue.textContent = meatValue + '%';

                state.distribution.vegWeight = vegValue;
                state.distribution.meatWeight = meatValue;
            });
        }

        // إعداد أزرار إعادة الرموز
        const resetSymbolsBtn = document.getElementById('resetSymbolsBtn');
        if (resetSymbolsBtn) {
            resetSymbolsBtn.addEventListener('click', () => {
                symbolCustomizer.resetSymbols();
            });
        }

        const randomizeSymbolsBtn = document.getElementById('randomizeSymbolsBtn');
        if (randomizeSymbolsBtn) {
            randomizeSymbolsBtn.addEventListener('click', () => {
                symbolCustomizer.randomizeSymbols();
            });
        }

        const exportSymbolsBtn = document.getElementById('exportSymbolsBtn');
        if (exportSymbolsBtn) {
            exportSymbolsBtn.addEventListener('click', () => {
                symbolCustomizer.exportSymbols();
            });
        }

        const importSymbolsBtn = document.getElementById('importSymbolsBtn');
        if (importSymbolsBtn) {
            importSymbolsBtn.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.onchange = (e) => {
                    if (e.target.files.length > 0) {
                        symbolCustomizer.importSymbols(e.target.files[0]);
                    }
                };
                input.click();
            });
        }

        // إعداد أزرار إعادة التعيين
        const resetStatsBtn = document.getElementById('resetStatsBtn');
        if (resetStatsBtn) {
            resetStatsBtn.addEventListener('click', () => {
                if (state.settings.confirmActions) {
                    if (!confirm('هل تريد إعادة تعيين جميع الإحصائيات؟')) {
                        return;
                    }
                }
                state.proBar = { hits: 0, misses: 0, streak: 0, bestStreak: 0, accuracy: 0 };
                state.consensus = { hits: 0, misses: 0, accuracy: 0 };
                state.bars = { hits: 0, misses: 0, accuracy: 0 };
                state.accuracy = { classic: 0, markov: 0, reverse: 0, advanced: 0, consensus: 0, pro: 0, bars: 0 };
                this.renderAll();
                this.showNotification('تم إعادة التعيين', 'تم إعادة تعيين جميع الإحصائيات', 'success');
            });
        }

        const resetPredictionsBtn = document.getElementById('resetPredictionsBtn');
        if (resetPredictionsBtn) {
            resetPredictionsBtn.addEventListener('click', () => {
                if (state.settings.confirmActions) {
                    if (!confirm('هل تريد إعادة تعيين جميع نماذج التعلم؟')) {
                        return;
                    }
                }
                predictionEngine.clearPredictions();
                this.showNotification('تم إعادة التعيين', 'تم إعادة تعيين جميع نماذج التعلم', 'success');
            });
        }

        const resetPatternsBtn = document.getElementById('resetPatternsBtn');
        if (resetPatternsBtn) {
            resetPatternsBtn.addEventListener('click', () => {
                if (state.settings.confirmActions) {
                    if (!confirm('هل تريد إعادة تعيين جميع أنماط التعلم؟')) {
                        return;
                    }
                }
                aiMemorySystem.clearPatterns();
                this.showNotification('تم إعادة التعيين', 'تم إعادة تعيين جميع أنماط التعلم', 'success');
            });
        }

        const resetAllBtn = document.getElementById('resetAllBtn');
        if (resetAllBtn) {
            resetAllBtn.addEventListener('click', () => {
                resetGame();
            });
        }

        // إعداد أزرار وضع التعديل
        const toggleEditMode = document.getElementById('toggleEditMode');
        if (toggleEditMode) {
            toggleEditMode.addEventListener('click', () => {
                const editOptions = document.getElementById('editOptions');
                if (editOptions) {
                    const isVisible = editOptions.style.display !== 'none';
                    editOptions.style.display = isVisible ? 'none' : 'block';
                    toggleEditMode.innerHTML = isVisible ?
                        '<i class="fas fa-edit"></i> تفعيل وضع التعديل' :
                        '<i class="fas fa-times"></i> إغلاق وضع التعديل';
                }
            });
        }

        // إعداد أزرار التعديل
        const addBalanceBtn = document.getElementById('addBalanceBtn');
        if (addBalanceBtn) {
            addBalanceBtn.addEventListener('click', () => {
                addBalance(500);
            });
        }

        const removeLastResultBtn = document.getElementById('removeLastResultBtn');
        if (removeLastResultBtn) {
            removeLastResultBtn.addEventListener('click', () => {
                removeLastResult();
            });
        }

        const reorderWheelBtn = document.getElementById('reorderWheelBtn');
        if (reorderWheelBtn) {
            reorderWheelBtn.addEventListener('click', () => {
                reorderWheel();
            });
        }

        const forceWinBtn = document.getElementById('forceWinBtn');
        if (forceWinBtn) {
            forceWinBtn.addEventListener('click', () => {
                forceWin();
            });
        }

        const unlockAllBtn = document.getElementById('unlockAllBtn');
        if (unlockAllBtn) {
            unlockAllBtn.addEventListener('click', () => {
                unlockAllFeatures();
            });
        }

        // إعداد أزرار النسخ الاحتياطي
        const exportBackupBtn = document.getElementById('exportBackupBtn');
        if (exportBackupBtn) {
            exportBackupBtn.addEventListener('click', () => {
                backupSystem.exportBackup();
            });
        }

        const clearBackupsBtn = document.getElementById('clearBackupsBtn');
        if (clearBackupsBtn) {
            clearBackupsBtn.addEventListener('click', () => {
                backupSystem.clearOldBackups();
            });
        }

        const backupNowBtn = document.getElementById('backupNowBtn');
        if (backupNowBtn) {
            backupNowBtn.addEventListener('click', () => {
                backupSystem.backupNow();
            });
        }

        // إعداد زر استيراد النسخ الاحتياطي
        const importBackupBtn = document.getElementById('importBackupBtn');
        if (importBackupBtn) {
            importBackupBtn.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.onchange = (e) => {
                    if (e.target.files.length > 0) {
                        backupSystem.importBackup(e.target.files[0]);
                    }
                };
                input.click();
            });
        }

        // إعداد زر إعادة اللعبة
        const resetGameBtn = document.getElementById('resetGameBtn');
        if (resetGameBtn) {
            resetGameBtn.addEventListener('click', () => {
                resetGame();
            });
        }

        // إعداد زر زيادة الرصيد
        const topUpBalanceBtn = document.getElementById('topUpBalanceBtn');
        if (topUpBalanceBtn) {
            topUpBalanceBtn.addEventListener('click', () => {
                addBalance(1000);
            });
        }

        // إعداد زر التقارير
        const showReportsBtn = document.getElementById('showReportsBtn');
        if (showReportsBtn) {
            showReportsBtn.addEventListener('click', () => {
                const modal = document.getElementById('reportsModal');
                if (modal) modal.classList.add('active');
            });
        }

        // إعداد زر المساعدة
        const helpBtn = document.getElementById('helpBtn');
        if (helpBtn) {
            helpBtn.addEventListener('click', () => {
                showHelp();
            });
        }

        // إعداد زر تصدير البيانات
        const exportDataBtn = document.getElementById('exportDataBtn');
        if (exportDataBtn) {
            exportDataBtn.addEventListener('click', () => {
                const dataStr = JSON.stringify(state, null, 2);
                const dataBlob = new Blob([dataStr], {
                    type: 'application/json'
                });
                const url = URL.createObjectURL(dataBlob);
                const a = document.createElement('a');

                a.href = url;
                a.download = `smart_prediction_data_${new Date().toISOString().slice(0, 10)}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                this.showNotification('تم التصدير', 'تم تصدير جميع بيانات اللعبة', 'success');
            });
        }

        // إعداد زر استيراد البيانات
        const importDataBtn = document.getElementById('importDataBtn');
        if (importDataBtn) {
            importDataBtn.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.onchange = (e) => {
                    if (e.target.files.length > 0) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            try {
                                const imported = JSON.parse(e.target.result);
                                Object.assign(state, imported);
                                UI.saveState();
                                UI.renderAll();
                                settingsManager.applySettingsToUI();
                                UI.showNotification('تم الاستيراد', 'تم استيراد بيانات اللعبة بنجاح', 'success');
                            } catch (error) {
                                UI.showNotification('خطأ', 'ملف غير صالح', 'error');
                            }
                        };
                        reader.readAsText(e.target.files[0]);
                    }
                };
                input.click();
            });
        }

        // إعداد أزرار النوافذ المنبثقة
        const closeBackupModalBtn = document.getElementById('closeBackupModalBtn');
        if (closeBackupModalBtn) {
            closeBackupModalBtn.addEventListener('click', () => {
                closeBackupModal();
            });
        }

        const closeReportsModalBtn = document.getElementById('closeReportsModalBtn');
        if (closeReportsModalBtn) {
            closeReportsModalBtn.addEventListener('click', () => {
                closeReportsModal();
            });
        }

        const closeHelpModalBtn = document.getElementById('closeHelpModalBtn');
        if (closeHelpModalBtn) {
            closeHelpModalBtn.addEventListener('click', () => {
                closeHelpModal();
            });
        }

        // إعداد أزرار مركز العجلة
        const wheelCenter = document.getElementById('wheelCenter');
        if (wheelCenter) {
            wheelCenter.addEventListener('click', () => {
                this.spinAndSelectWinner();
            });
        }

        // إعداد أزرار أدوات النظام
        const clearCacheBtn = document.getElementById('clearCacheBtn');
        if (clearCacheBtn) {
            clearCacheBtn.addEventListener('click', () => {
                if (confirm('هل تريد مسح الذاكرة المؤقتة؟')) {
                    // مسح البيانات المؤقتة
                    state.spinHistory = [];
                    state.patternMemory = [];
                    state.sessionHistory = [];
                    
                    // تحديث حجم الذاكرة
                    this.updateMemoryUsage();
                    
                    this.showNotification('تم المسح', 'تم مسح الذاكرة المؤقتة', 'success');
                }
            });
        }

        const optimizeSystemBtn = document.getElementById('optimizeSystemBtn');
        if (optimizeSystemBtn) {
            optimizeSystemBtn.addEventListener('click', () => {
                this.optimizeSystem();
            });
        }

        const diagnoseSystemBtn = document.getElementById('diagnoseSystemBtn');
        if (diagnoseSystemBtn) {
            diagnoseSystemBtn.addEventListener('click', () => {
                this.diagnoseSystem();
            });
        }

        const exportLogsBtn = document.getElementById('exportLogsBtn');
        if (exportLogsBtn) {
            exportLogsBtn.addEventListener('click', () => {
                this.exportLogs();
            });
        }

        console.log('✅ تم إعداد جميع مستمعي الأحداث');
    },

    setupQuickActions: function() {
        const container = document.getElementById('quickActions');
        if (!container) return;

        container.innerHTML = '';

        // إضافة الرموز العادية
        state.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'quick-btn';
            
            if (option.mult >= 20) {
                btn.classList.add('high-value');
            }
            
            btn.dataset.id = option.id;
            btn.innerHTML = `
                ${option.emoji}
                ${option.name_ar}
                <span class="quick-btn-bet" style="display: none;">0</span>
            `;

            // النقر العادي للفوز
            btn.addEventListener('click', () => {
                this.showWinnerConfirmation(option);
            });

            // النقر المطول للرهان
            let longPressTimer;
            btn.addEventListener('mousedown', () => {
                longPressTimer = setTimeout(() => {
                    const amount = parseInt(document.getElementById('betPreset').value) || 100;
                    betManager.placeSingleBet(option.id, amount);
                }, 500);
            });

            btn.addEventListener('mouseup', () => {
                clearTimeout(longPressTimer);
            });

            btn.addEventListener('mouseleave', () => {
                clearTimeout(longPressTimer);
            });

            // اللمس للهواتف
            btn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                longPressTimer = setTimeout(() => {
                    const amount = parseInt(document.getElementById('betPreset').value) || 100;
                    betManager.placeSingleBet(option.id, amount);
                }, 500);
            });

            btn.addEventListener('touchend', (e) => {
                e.preventDefault();
                clearTimeout(longPressTimer);
            });

            container.appendChild(btn);
        });

        // إضافة الرموز الخاصة
        state.customSpecialSymbols.forEach(special => {
            const btn = document.createElement('button');
            btn.className = 'quick-btn special';
            btn.dataset.id = special.id;
            btn.innerHTML = `
                ${special.emoji}
                ${special.name_ar}
                <span class="quick-btn-bet" style="display: none;">0</span>
            `;

            btn.addEventListener('click', () => {
                this.showSpecialWinnerConfirmation(special);
            });

            container.appendChild(btn);
        });
    },

    toggleControlPanel: function() {
        const panel = document.getElementById('controlPanel');
        const toggleBtn = document.getElementById('panelToggleBtn');

        if (!panel || !toggleBtn) return;

        panel.classList.toggle('active');

        if (panel.classList.contains('active')) {
            toggleBtn.innerHTML = '<i class="fas fa-times"></i><span class="btn-tooltip">إغلاق التحكم</span>';
            toggleBtn.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
        } else {
            toggleBtn.innerHTML = '<i class="fas fa-brain"></i><span class="btn-tooltip">لوحة التحكم</span>';
            toggleBtn.style.background = 'linear-gradient(135deg, #0b66ff, #0954d9)';
        }
    },

    closeControlPanel: function() {
        const panel = document.getElementById('controlPanel');
        const toggleBtn = document.getElementById('panelToggleBtn');

        if (panel) {
            panel.classList.remove('active');
        }
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-brain"></i><span class="btn-tooltip">لوحة التحكم</span>';
            toggleBtn.style.background = 'linear-gradient(135deg, #0b66ff, #0954d9)';
        }
    },

    renderWheel: function() {
        const container = document.getElementById('gameWheel');
        if (!container) return;

        container.innerHTML = '';

        const radius = 100;
        const centerX = 120;
        const centerY = 120;
        const count = state.options.length;

        for (let i = 0; i < count; i++) {
            const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            const option = state.options[i];
            if (!option) continue;

            const betAmount = state.currentBets[option.emoji] || 0;

            // إنشاء الرمز
            const symbol = document.createElement('div');
            symbol.className = 'wheel-symbol ' + option.type;
            symbol.textContent = option.emoji;
            symbol.title = `${option.name_ar} (مضاعف: ${option.mult}x)\nالرهان: ${betAmount}`;
            symbol.dataset.id = option.id;

            symbol.style.left = (x - 22.5) + 'px';
            symbol.style.top = (y - 22.5) + 'px';

            symbol.addEventListener('click', () => {
                const presetSelect = document.getElementById('betPreset');
                const amount = parseInt(presetSelect ? presetSelect.value : 100);

                betManager.placeSingleBet(option.id, amount);
            });

            symbol.addEventListener('mouseenter', () => {
                if (state.settings.showAnimations) {
                    symbol.style.transform = 'scale(1.1)';
                    symbol.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
                }
            });

            symbol.addEventListener('mouseleave', () => {
                if (state.settings.showAnimations) {
                    symbol.style.transform = 'scale(1)';
                    if (option.type === 'vegetable') {
                        symbol.style.boxShadow = '0 3px 6px rgba(76, 175, 80, 0.3)';
                    } else {
                        symbol.style.boxShadow = '0 3px 6px rgba(244, 67, 54, 0.3)';
                    }
                }
            });

            container.appendChild(symbol);

            // إضافة مؤشر الرهان
            if (betAmount > 0) {
                const betIndicator = document.createElement('div');
                betIndicator.className = 'symbol-bet';
                betIndicator.textContent = betAmount;
                betIndicator.title = `رهان: ${betAmount}`;
                symbol.appendChild(betIndicator);
            }
        }
    },

    renderBars: function() {
        // شريط الكلاسيكي
        const classicBar = document.getElementById('barClassic');
        if (classicBar) {
            classicBar.innerHTML = '';
            const predictions = predictionEngine.generateClassic();
            predictions.slice(0, 6).forEach(pred => {
                const slot = document.createElement('div');
                slot.className = 'slot ' + pred.type;
                slot.textContent = pred.emoji;
                slot.title = `${pred.name} - ${pred.type === 'vegetable' ? 'خضار' : 'لحم'} - ثقة: ${Math.round(pred.confidence * 100)}%`;
                classicBar.appendChild(slot);
            });
        }

        // شريط ماركوف
        const markovBar = document.getElementById('barMarkov');
        if (markovBar) {
            markovBar.innerHTML = '';
            const predictions = predictionEngine.generateMarkov();
            predictions.slice(0, 6).forEach(pred => {
                const slot = document.createElement('div');
                slot.className = 'slot ' + pred.type;
                slot.textContent = pred.emoji;
                slot.title = `${pred.name} - ${pred.type === 'vegetable' ? 'خضار' : 'لحم'} - ثقة: ${Math.round(pred.confidence * 100)}%`;
                markovBar.appendChild(slot);
            });
        }

        // شريط العكسي
        const reverseBar = document.getElementById('barReverse');
        if (reverseBar) {
            reverseBar.innerHTML = '';
            const predictions = predictionEngine.generateReverse();
            predictions.slice(0, 6).forEach(pred => {
                const slot = document.createElement('div');
                slot.className = 'slot ' + pred.type;
                slot.textContent = pred.emoji;
                slot.title = `${pred.name} - ${pred.type === 'vegetable' ? 'خضار' : 'لحم'} - ثقة: ${Math.round(pred.confidence * 100)}%`;
                reverseBar.appendChild(slot);
            });
        }

        // شريط المتقدم
        const advancedBar = document.getElementById('barAdvanced');
        if (advancedBar) {
            advancedBar.innerHTML = '';
            const predictions = predictionEngine.generateAdvanced();
            predictions.slice(0, 6).forEach(pred => {
                const slot = document.createElement('div');
                slot.className = 'slot ' + pred.type;
                slot.textContent = pred.emoji;
                slot.title = `${pred.name} - ${pred.type === 'vegetable' ? 'خضار' : 'لحم'} - قوة: ${predictionEngine.getStrengthText(pred.strength)} - ثقة: ${Math.round(pred.confidence * 100)}%`;
                advancedBar.appendChild(slot);
            });
        }

        // تحديث الدقة
        this.updateBarAccuracies();
    },

    renderConsensusBar: function() {
        const container = document.getElementById('consensusBar');
        if (!container) return;

        container.innerHTML = '';

        const predictions = predictionEngine.generateConsensus();

        predictions.forEach(pred => {
            const slot = document.createElement('div');
            slot.className = 'consensus-slot ' + pred.type;
            slot.textContent = pred.emoji;
            slot.title = `${pred.name} - ${pred.type === 'vegetable' ? 'خضار' : 'لحم'} - قوة: ${predictionEngine.getStrengthText(pred.strength)}`;

            container.appendChild(slot);
        });

        this.updateConsensusAccuracy();
    },

    renderProBar: function() {
        const container = document.getElementById('predictionsGrid');
        const audioContainer = document.getElementById('proAudioBar');

        if (container) {
            container.innerHTML = '';
            const predictions = predictionEngine.generateProBar();

            predictions.slice(0, 6).forEach(pred => {
                const card = document.createElement('div');
                card.className = 'prediction-card ' + pred.type;

                const strengthText = predictionEngine.getStrengthText(pred.strength);
                const strengthClass = pred.strength;

                card.innerHTML = `
                <div class="prediction-emoji">${pred.emoji}</div>
                <div class="prediction-name">${pred.name}</div>
                <div class="prediction-strength ${strengthClass}">${strengthText}</div>
                <div class="prediction-probability">${Math.round(pred.probability * 100)}%</div>
                `;

                container.appendChild(card);
            });
        }

        if (audioContainer) {
            audioContainer.innerHTML = '';
            const predictions = predictionEngine.generateProBar();

            predictions.slice(0, 6).forEach(pred => {
                const audioSlot = document.createElement('div');
                audioSlot.className = 'audio-slot ' + pred.type;
                audioSlot.textContent = pred.emoji;
                audioSlot.title = `${pred.name} - ${predictionEngine.getStrengthText(pred.strength)}`;

                audioSlot.addEventListener('click', () => {
                    if (state.settings.sound && state.settings.autoSoundProBar) {
                        audioSystem.playSound(pred.emoji);
                    }
                });

                audioContainer.appendChild(audioSlot);
            });
        }

        this.updateProBarAccuracy();
    },

    renderWinningOptions: function() {
        const container = document.getElementById('winningSlots');
        if (!container) return;

        container.innerHTML = '';

        // إضافة الرموز عالية القيمة أولاً
        const highValueOptions = state.options.filter(opt => opt.mult >= 20);
        highValueOptions.forEach(option => {
            const slot = document.createElement('div');
            slot.className = 'winning-slot high-value';
            slot.textContent = option.emoji;
            slot.title = `${option.name_ar} - مضاعف ${option.mult}x`;
            slot.dataset.id = option.id;

            slot.addEventListener('click', () => {
                this.showWinnerConfirmation(option);
            });

            container.appendChild(slot);
        });

        // إضافة الرموز الخاصة
        state.customSpecialSymbols.forEach(special => {
            const slot = document.createElement('div');
            slot.className = 'winning-slot special';
            slot.textContent = special.emoji;
            slot.title = `${special.name_ar} - فوز ${special.winGroup === 'meat' ? 'لحوم' : special.winGroup === 'vegetable' ? 'خضار' : special.winGroup === 'all' ? 'الكل' : 'عالي القيمة'}`;
            slot.dataset.id = special.id;

            slot.addEventListener('click', () => {
                this.showSpecialWinnerConfirmation(special);
            });

            container.appendChild(slot);
        });

        // إضافة بعض الرموز العشوائية لملء الشريط
        const remainingSlots = 10 - (highValueOptions.length + state.customSpecialSymbols.length);
        if (remainingSlots > 0) {
            const otherOptions = state.options.filter(opt => opt.mult < 20);
            const randomOptions = [...otherOptions].sort(() => Math.random() - 0.5).slice(0, remainingSlots);
            
            randomOptions.forEach(option => {
                const slot = document.createElement('div');
                slot.className = `winning-slot ${option.type}`;
                slot.textContent = option.emoji;
                slot.title = `${option.name_ar} - مضاعف ${option.mult}x`;
                slot.dataset.id = option.id;

                slot.addEventListener('click', () => {
                    this.showWinnerConfirmation(option);
                });

                container.appendChild(slot);
            });
        }
        

        // تحديث الإحصائيات
        const specialCount = document.getElementById('specialCount');
        if (specialCount) {
            specialCount.textContent = state.customSpecialSymbols.length;
        }

        const highValueCount = document.getElementById('highValueCount');
        if (highValueCount) {
            highValueCount.textContent = highValueOptions.length;
        }
    },

    renderResults: function() {
        const container = document.getElementById('resultsStrip');
        if (!container) return;

        container.innerHTML = '';

        const recent = state.history.slice(0, 20);

        if (recent.length === 0) {
            return;
        }

        recent.forEach(result => {
            const item = document.createElement('div');
            item.className = 'result-item';

            if (result.isSpecial) {
                item.classList.add('special');
                item.title = `${result.name} - فوز ${result.winGroup === 'meat' ? 'لحوم' : result.winGroup === 'vegetable' ? 'خضار' : result.winGroup === 'all' ? 'الكل' : 'عالي القيمة'}`;
            } else if (result.type === 'vegetable') {
                item.classList.add('vegetable');
                item.title = `${result.name} - ربح: ${result.winAmount || 0}`;
            } else {
                item.classList.add('meat');
                item.title = `${result.name} - ربح: ${result.winAmount || 0}`;
            }

            item.textContent = result.emoji;
            container.appendChild(item);
        });

        this.updateResultsStats();
    },

    renderWinsStrip: function() {
        const container = document.getElementById('winsStrip');
        if (!container) return;

        container.innerHTML = '';

        const recentWins = state.history
            .filter(h => h.winAmount > 0)
            .slice(0, 10);

        if (recentWins.length === 0) {
            return;
        }

        recentWins.forEach(win => {
            const item = document.createElement('div');
            item.className = 'win-item';

            if (win.type === 'vegetable') {
                item.classList.add('veg');
            } else if (win.type === 'meat') {
                item.classList.add('meat');
            } else {
                item.classList.add('special');
            }

            item.innerHTML = `
            <div class="emoji">${win.emoji}</div>
            <div class="amount">+${win.winAmount}</div>
            `;

            container.appendChild(item);
        });
        
        

        // تحديث إحصائيات الفوز
        this.updateWinStats();
    },

    renderAll: function() {
        this.renderWheel();
        this.renderBars();
        this.renderConsensusBar();
        this.renderProBar();
        this.renderWinningOptions();
        this.renderResults();
        this.renderWinsStrip();
        this.updateDashboard();
        this.updateControlBadges();
        this.updateRiskDisplay();
        this.updateDistributionPreview();
        this.updateQuickActionsBets();

        // تحديث معلومات النسخ الاحتياطي
        backupSystem.updateBackupInfo();
    },

    updateDashboard: function() {
        // تحديث شريط العنوان
        const headerBalance = document.getElementById('headerBalance');
        if (headerBalance) headerBalance.textContent = state.balance;

        const headerWins = document.getElementById('headerWins');
        if (headerWins) headerWins.textContent = state.totalWins;

        const headerRounds = document.getElementById('headerRounds');
        if (headerRounds) headerRounds.textContent = state.history.length;

        const totalPredictions = state.proBar.hits + state.proBar.misses;
        const accuracy = totalPredictions > 0 ?
            Math.round((state.proBar.hits / totalPredictions) * 100) : 0;

        const headerAccuracy = document.getElementById('headerAccuracy');
        if (headerAccuracy) headerAccuracy.textContent = accuracy + '%';

        const headerStreak = document.getElementById('headerStreak');
        if (headerStreak) headerStreak.textContent = state.proBar.streak;

        const headerBestStreak = document.getElementById('headerBestStreak');
        if (headerBestStreak) headerBestStreak.textContent = state.proBar.bestStreak;

        // تحديث إحصائيات النظام
        const currentBalance = document.getElementById('currentBalance');
        if (currentBalance) currentBalance.textContent = state.balance;

        const currentWins = document.getElementById('currentWins');
        if (currentWins) currentWins.textContent = state.totalWins;

        const currentLosses = document.getElementById('currentLosses');
        if (currentLosses) currentLosses.textContent = state.totalLosses;

        const riskLevel = riskAnalyzer.getRiskLevel();
        const riskValue = document.getElementById('currentRisk');
        if (riskValue) {
            riskValue.textContent = riskLevel.level;
            riskValue.style.color = riskLevel.color;
        }

        const currentAccuracy = document.getElementById('currentAccuracy');
        if (currentAccuracy) {
            currentAccuracy.textContent = accuracy + '%';
        }

        const currentStreak = document.getElementById('currentStreak');
        if (currentStreak) {
            currentStreak.textContent = state.proBar.streak;
        }

        // تحديث الجلسة
        const sessionStreak = document.getElementById('sessionStreak');
        if (sessionStreak) {
            sessionStreak.textContent = state.session.streak || 0;
        }

        const sessionAccuracy = document.getElementById('sessionAccuracy');
        if (sessionAccuracy) {
            const sessionTotal = state.sessionWins + state.sessionLosses;
            const sessionAcc = sessionTotal > 0 ?
                Math.round((state.sessionWins / sessionTotal) * 100) : 0;
            sessionAccuracy.textContent = sessionAcc + '%';
        }

        // تحديث العجلة
        const spinCount = document.getElementById('spinCount');
        if (spinCount) spinCount.textContent = state.totalSpins;

        const hitRate = document.getElementById('hitRate');
        if (hitRate) {
            const totalSpins = state.totalSpins;
            const hitRateValue = totalSpins > 0 ?
                Math.round((state.totalWins / totalSpins) * 100) : 0;
            hitRate.textContent = hitRateValue + '%';
        }

        // تحديث الأشرطة
        const barsHits = document.getElementById('barsHits');
        if (barsHits) barsHits.textContent = state.bars.hits;

        const barsMisses = document.getElementById('barsMisses');
        if (barsMisses) barsMisses.textContent = state.bars.misses;

        const barsAccuracy = document.getElementById('barsAccuracy');
        if (barsAccuracy) barsAccuracy.textContent = state.bars.accuracy + '%';

        // تحديث الخيارات السريعة
        const quickActionsCount = document.getElementById('quickActionsCount');
        if (quickActionsCount) {
            quickActionsCount.textContent = state.options.length + state.customSpecialSymbols.length;
        }

        const hotStreak = document.getElementById('hotStreak');
        if (hotStreak) {
            hotStreak.textContent = state.proBar.streak >= 3 ? state.proBar.streak : 0;
        }

        // تحديث الصوت
        const audioCount = document.getElementById('audioCount');
        if (audioCount) audioCount.textContent = state.settings.repeatCount;

        const repeatCount = document.getElementById('repeatCount');
        if (repeatCount) repeatCount.textContent = state.settings.repeatCount;
    },

    updateControlBadges: function() {
        const smartBadge = document.getElementById('smartControlBadge');
        const autoBadge = document.getElementById('autoDistributeBadge');

        if (smartBadge) {
            if (state.controlSettings.smartControl) {
                smartBadge.innerHTML = '<i class="fas fa-check-circle"></i><span>الذكي مفعل</span>';
                smartBadge.className = 'control-badge active';
            } else {
                smartBadge.innerHTML = '<i class="fas fa-times-circle"></i><span>الذكي متوقف</span>';
                smartBadge.className = 'control-badge inactive';
            }
        }

        if (autoBadge) {
            if (state.controlSettings.autoDistribute) {
                autoBadge.innerHTML = '<i class="fas fa-check-circle"></i><span>التلقائي مفعل</span>';
                autoBadge.className = 'control-badge active';
            } else {
                autoBadge.innerHTML = '<i class="fas fa-times-circle"></i><span>التلقائي متوقف</span>';
                autoBadge.className = 'control-badge inactive';
            }
        }
    },

    updateRiskDisplay: function() {
        const riskLevel = riskAnalyzer.getRiskLevel();

        const riskValue = document.getElementById('riskLevelValue');
        const riskFill = document.getElementById('riskFill');
        const riskTip = document.getElementById('riskTip');

        if (riskValue) {
            riskValue.textContent = `${riskLevel.level} (${Math.round(state.riskLevel * 100)}%)`;
            riskValue.className = `risk-value ${riskLevel.level === 'منخفض' ? 'low' : riskLevel.level === 'متوسط' ? 'medium' : 'high'}`;
        }

        if (riskFill) {
            riskFill.style.width = `${state.riskLevel * 100}%`;
            riskFill.className = `risk-fill ${riskLevel.level === 'منخفض' ? 'low' : riskLevel.level === 'متوسط' ? 'medium' : 'high'}`;
        }

        if (riskTip) {
            riskTip.textContent = riskLevel.advice;
        }

        // تحديث شارة المخاطر
        riskAnalyzer.updateRiskBadge();
    },

    updateBarAccuracies: function() {
        const classicAccuracy = document.getElementById('classicAccuracy');
        if (classicAccuracy) classicAccuracy.textContent = Math.round(state.accuracy.classic) + '%';

        const markovAccuracy = document.getElementById('markovAccuracy');
        if (markovAccuracy) markovAccuracy.textContent = Math.round(state.accuracy.markov) + '%';

        const reverseAccuracy = document.getElementById('reverseAccuracy');
        if (reverseAccuracy) reverseAccuracy.textContent = Math.round(state.accuracy.reverse) + '%';

        const advancedAccuracy = document.getElementById('advancedAccuracy');
        if (advancedAccuracy) advancedAccuracy.textContent = Math.round(state.accuracy.advanced) + '%';
    },

    updateConsensusAccuracy: function() {
        const total = state.consensus.hits + state.consensus.misses;
        const accuracy = total > 0 ?
            Math.round((state.consensus.hits / total) * 100) : 0;

        const consensusHits = document.getElementById('consensusHits');
        if (consensusHits) consensusHits.textContent = state.consensus.hits;

        const consensusMisses = document.getElementById('consensusMisses');
        if (consensusMisses) consensusMisses.textContent = state.consensus.misses;

        const consensusAccuracy = document.getElementById('consensusAccuracy');
        if (consensusAccuracy) consensusAccuracy.textContent = accuracy + '%';
    },

    updateProBarAccuracy: function() {
        const total = state.proBar.hits + state.proBar.misses;
        const accuracy = total > 0 ?
            Math.round((state.proBar.hits / total) * 100) : 0;

        const proHits = document.getElementById('proHits');
        if (proHits) proHits.textContent = state.proBar.hits;

        const proMisses = document.getElementById('proMisses');
        if (proMisses) proMisses.textContent = state.proBar.misses;

        const proAccuracy = document.getElementById('proAccuracy');
        if (proAccuracy) proAccuracy.textContent = accuracy + '%';

        const proStreak = document.getElementById('proStreak');
        if (proStreak) proStreak.textContent = state.proBar.streak;
    },

    updateResultsStats: function() {
        const vegCount = state.history.filter(h => h.type === 'vegetable').length;
        const meatCount = state.history.filter(h => h.type === 'meat').length;
        const specialCount = state.history.filter(h => h.isSpecial).length;

        const vegCountElement = document.getElementById('vegCount');
        if (vegCountElement) vegCountElement.textContent = vegCount;

        const meatCountElement = document.getElementById('meatCount');
        if (meatCountElement) meatCountElement.textContent = meatCount;

        const specialCountResult = document.getElementById('specialCountResult');
        if (specialCountResult) specialCountResult.textContent = specialCount;

        const totalCountElement = document.getElementById('totalCount');
        if (totalCountElement) totalCountElement.textContent = state.history.length;
    },

    updateWinStats: function() {
        const vegWins = state.history.filter(h => h.type === 'vegetable' && h.winAmount > 0).length;
        const meatWins = state.history.filter(h => h.type === 'meat' && h.winAmount > 0).length;
        const specialWins = state.history.filter(h => h.isSpecial && h.winAmount > 0).length;

        const vegWinsElement = document.getElementById('vegWins');
        if (vegWinsElement) vegWinsElement.textContent = vegWins;

        const meatWinsElement = document.getElementById('meatWins');
        if (meatWinsElement) meatWinsElement.textContent = meatWins;

        const specialWinsElement = document.getElementById('specialWins');
        if (specialWinsElement) specialWinsElement.textContent = specialWins;
    },

    updateDistributionPreview: function() {
        const container = document.getElementById('distributionPreview');
        if (!container) return;

        if (state.currentDistribution && Object.keys(state.currentDistribution).length > 0) {
            let html = '<div class="distribution-summary">';
            let totalBet = 0;
            let totalPotential = 0;

            Object.entries(state.currentDistribution).forEach(([emoji, bet]) => {
                html += `
                <div class="distribution-item">
                    <span>${emoji} ${bet.name}</span>
                    <span>${bet.amount} (ربح: ${bet.potentialWin})</span>
                </div>
                `;

                totalBet += bet.amount;
                totalPotential += bet.potentialWin;
            });

            const netProfit = totalPotential - totalBet;

            html += `
            <div class="distribution-item" style="font-weight:bold; border-top:1px solid #ccc; margin-top:5px; padding-top:5px;">
                <span>المجموع:</span>
                <span>${totalBet}</span>
            </div>
            <div class="distribution-item">
                <span>إجمالي الربح المحتمل:</span>
                <span>${totalPotential}</span>
            </div>
            <div class="distribution-item" style="color:${netProfit >= 0 ? '#28a745' : '#dc3545'};">
                <span>صافي الربح:</span>
                <span>${netProfit >= 0 ? '+' : ''}${netProfit}</span>
            </div>
            </div>`;

            container.innerHTML = html;
        } else {
            container.innerHTML = '<div style="text-align:center; color:#666; padding:10px;">لم يتم توزيع أي رهان</div>';
        }
    },

    updateQuickActionsBets: function() {
        document.querySelectorAll('.quick-btn').forEach(btn => {
            const optionId = parseInt(btn.dataset.id);
            const option = state.options.find(o => o.id === optionId) || 
                          state.customSpecialSymbols.find(s => s.id === optionId);
            
            if (option) {
                const betAmount = state.currentBets[option.emoji] || 0;
                const betIndicator = btn.querySelector('.quick-btn-bet');
                
                if (betIndicator) {
                    if (betAmount > 0) {
                        betIndicator.textContent = betAmount;
                        betIndicator.style.display = 'flex';
                    } else {
                        betIndicator.style.display = 'none';
                    }
                }
            }
        });
    },

    declareWinner: function(winnerId) {
        const winner = state.options.find(o => o.id === winnerId);
        if (!winner) return;

        let winAmount = 0;
        if (state.currentBets[winner.emoji]) {
            const betAmount = state.currentBets[winner.emoji];
            winAmount = betAmount * winner.mult;
        }

        // حساب الخسائر من الرهانات الأخرى
        let totalLoss = 0;
        Object.keys(state.currentBets).forEach(emoji => {
            if (emoji !== winner.emoji) {
                totalLoss += state.currentBets[emoji];
            }
        });

        // تحديث الرصيد
        state.balance += winAmount;
        state.balance -= totalLoss;

        // تحديث الإحصائيات
        state.totalSpins++;
        
        if (winAmount > 0) {
            state.totalWins++;
            state.sessionWins++;
            state.proBar.streak++;
            state.session.streak++;

            if (state.proBar.streak > state.proBar.bestStreak) {
                state.proBar.bestStreak = state.proBar.streak;
            }

            if (state.session.streak > state.session.hotStreak) {
                state.session.hotStreak = state.session.streak;
            }
        } else {
            state.totalLosses++;
            state.sessionLosses++;
            state.proBar.streak = 0;
            state.session.streak = 0;
        }

        // تقييم التنبؤات
        const wasPredicted = predictionEngine.evaluatePrediction(winner.emoji);

        if (wasPredicted) {
            state.proBar.hits++;

            const consensusPredictions = predictionEngine.lastPredictions.consensus;
            if (consensusPredictions && consensusPredictions.some(p => p.emoji === winner.emoji)) {
                state.consensus.hits++;
            } else {
                state.consensus.misses++;
            }
        } else {
            state.proBar.misses++;
        }

        // تسجيل النمط في الذاكرة
        aiMemorySystem.recordPattern(winner.id, wasPredicted);

        // إضافة إلى السجل
        state.history.unshift({
            id: winner.id,
            emoji: winner.emoji,
            name: winner.name_ar,
            type: winner.type,
            winAmount: winAmount,
            lossAmount: totalLoss,
            timestamp: Date.now(),
            isSpecial: false
        });

        // إشعارات
        if (winAmount > 0) {
            this.showNotification('🎉 فوز!', `${winner.emoji} ${winner.name_ar}\nربحت: ${winAmount} نقطة`, 'success');

            if (state.settings.sound && !audioSystem.isMuted) {
                audioSystem.playWinSound();
                audioSystem.playSound(winner.emoji);
            }
        } else {
            this.showNotification('⚠️ خسارة', `${winner.emoji} ${winner.name_ar}\nلم تربح شيئاً`, 'warning');
            
            if (state.settings.sound && !audioSystem.isMuted) {
                audioSystem.playLossSound();
            }
        }

        if (totalLoss > 0) {
            this.showNotification('💸 خسائر', `خسرت ${totalLoss} نقطة من الرهانات الأخرى`, 'error');
        }

        // مسح الرهانات تلقائياً بعد الفوز
        state.currentBets = {};
        state.currentDistribution = null;

        this.renderAll();
        this.saveState();

        // المراهنة التلقائية المحسنة
        if (state.controlSettings.autoBetting) {
            setTimeout(() => {
                betManager.autoPlaceBets();
            }, 1500);
        }

        // التوزيع التلقائي المحسن
        if (state.controlSettings.autoDistribute) {
            if (state.proBar.streak >= 2) { // بعد فوزين متتاليين
                setTimeout(() => {
                    const amount = parseInt(document.getElementById('betAmount').value) || 100;
                    distributionSystem.distribute(amount, state.distribution.type);
                }, 2000);
            } else if (winAmount === 0 && state.proBar.streak === 0) {
                // توقف التوزيع التلقائي بعد خسارتين متتاليتين
                state.controlSettings.autoDistribute = false;
                this.updateControlBadges();
                this.showNotification(
                    'توقف التوزيع',
                    'تم إيقاف التوزيع التلقائي بسبب الخسارة',
                    'warning'
                );
            }
        }
    },

    declareSpecialWinner: function(specialId) {
        const special = state.customSpecialSymbols.find(s => s.id === specialId);
        if (!special) return;

        const winGroup = special.winGroup;
        let totalWin = 0;

        if (state.currentBets) {
            if (winGroup === 'all') {
                // الفوز على جميع الرهانات
                Object.keys(state.currentBets).forEach(emoji => {
                    const option = state.options.find(o => o.emoji === emoji);
                    if (option) {
                        const betAmount = state.currentBets[emoji];
                        totalWin += betAmount * special.mult;
                    }
                });
            } else if (winGroup === 'high') {
                // الفوز على الرموز عالية القيمة فقط
                Object.keys(state.currentBets).forEach(emoji => {
                    const option = state.options.find(o => o.emoji === emoji);
                    if (option && option.mult >= 20) {
                        const betAmount = state.currentBets[emoji];
                        totalWin += betAmount * special.mult;
                    }
                });
            } else {
                // الفوز حسب النوع
                Object.keys(state.currentBets).forEach(emoji => {
                    const option = state.options.find(o => o.emoji === emoji);
                    if (option && option.type === winGroup) {
                        const betAmount = state.currentBets[emoji];
                        totalWin += betAmount * special.mult;
                    }
                });
            }
        }

        state.balance += totalWin;

        if (totalWin > 0) {
            state.totalWins++;
            state.sessionWins++;
            state.proBar.streak++;
            state.session.streak++;
        } else {
            state.totalLosses++;
            state.sessionLosses++;
            state.proBar.streak = 0;
            state.session.streak = 0;
        }

        state.history.unshift({
            id: special.id,
            emoji: special.emoji,
            name: special.name_ar,
            type: 'special',
            winGroup: winGroup,
            winAmount: totalWin,
            timestamp: Date.now(),
            isSpecial: true
        });

        // مسح الرهانات بعد الفوز الخاص
        state.currentBets = {};
        state.currentDistribution = null;

        if (totalWin > 0) {
            this.showNotification('🎊 فوز خاص!', 
                `${special.emoji} ${special.name_ar}\nفوز ${winGroup === 'meat' ? 'اللحوم' : winGroup === 'vegetable' ? 'الخضار' : winGroup === 'all' ? 'الكل' : 'عالي القيمة'}\nربحت: ${totalWin} نقطة`, 
                'success');
                
            if (state.settings.sound && !audioSystem.isMuted) {
                audioSystem.playWinSound();
                audioSystem.playSound(special.emoji);
            }
        } else {
            this.showNotification('🎊 فوز خاص', 
                `${special.emoji} ${special.name_ar}\nفوز ${winGroup === 'meat' ? 'اللحوم' : winGroup === 'vegetable' ? 'الخضار' : winGroup === 'all' ? 'الكل' : 'عالي القيمة'}`, 
                'info');
        }

        this.renderAll();
        this.saveState();
    },

    showWinnerConfirmation: function(option) {
        const modal = document.getElementById('winnerModal');
        const details = document.getElementById('winnerDetails');

        if (!modal || !details) return;

        let winAmount = 0;
        if (state.currentBets[option.emoji]) {
            const betAmount = state.currentBets[option.emoji];
            winAmount = betAmount * option.mult;
        }

        details.innerHTML = `
        <div style="text-align:center;">
            <div style="font-size:48px; margin:10px 0;">${option.emoji}</div>
            <h3 style="margin-bottom:10px;">${option.name_ar}</h3>
            <div style="background:#f8f9fa; padding:15px; border-radius:10px; margin-bottom:15px;">
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <span>النوع:</span>
                    <span>${option.type === 'vegetable' ? '🥦 خضار' : '🥩 لحوم'}</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <span>المضاعف:</span>
                    <span>${option.mult}x</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <span>الرهان الحالي:</span>
                    <span>${state.currentBets[option.emoji] || 0}</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <span>المكسب المحتمل:</span>
                    <span style="color:#28a745; font-weight:bold;">${winAmount}</span>
                </div>
            </div>
            <p style="color:#666; font-size:14px;">هل تريد إعلان فوز هذا الخيار؟</p>
        </div>
        `;

        // إزالة أي مستمعي أحداث سابقين
        const oldConfirmBtn = document.getElementById('confirmWinnerBtn');
        const oldCancelBtn = document.getElementById('cancelWinnerBtn');

        if (oldConfirmBtn && oldCancelBtn) {
            const newConfirmBtn = oldConfirmBtn.cloneNode(true);
            const newCancelBtn = oldCancelBtn.cloneNode(true);

            oldConfirmBtn.parentNode.replaceChild(newConfirmBtn, oldConfirmBtn);
            oldCancelBtn.parentNode.replaceChild(newCancelBtn, oldCancelBtn);

            newConfirmBtn.onclick = () => {
                this.declareWinner(option.id);
                modal.classList.remove('active');
            };

            newCancelBtn.onclick = () => {
                modal.classList.remove('active');
            };
        }

        modal.classList.add('active');
    },

    showSpecialWinnerConfirmation: function(special) {
        const modal = document.getElementById('winnerModal');
        const details = document.getElementById('winnerDetails');

        if (!modal || !details) return;

        details.innerHTML = `
        <div style="text-align:center;">
            <div style="font-size:48px; margin:10px 0;">${special.emoji}</div>
            <h3 style="margin-bottom:10px;">${special.name_ar}</h3>
            <div style="background:#f8f9fa; padding:15px; border-radius:10px; margin-bottom:15px;">
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <span>النوع:</span>
                    <span>فائز خاص</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <span>الفائزون:</span>
                    <span>${special.winGroup === 'meat' ? '🥩 كل اللحوم' : 
                           special.winGroup === 'vegetable' ? '🥦 كل الخضار' : 
                           special.winGroup === 'all' ? '🎯 الكل' : 
                           '👑 عالي القيمة'}</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <span>المضاعف:</span>
                    <span>${special.mult}x</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <span>الرهانات المؤهلة:</span>
                    <span>${Object.keys(state.currentBets).filter(emoji => {
                        if (special.winGroup === 'all') return true;
                        if (special.winGroup === 'high') {
                            const option = state.options.find(o => o.emoji === emoji);
                            return option && option.mult >= 20;
                        }
                        const option = state.options.find(o => o.emoji === emoji);
                        return option && option.type === special.winGroup;
                    }).length}</span>
                </div>
            </div>
            <p style="color:#666; font-size:14px;">هل تريد إعلان فوز ${special.winGroup === 'meat' ? 'اللحوم' : 
               special.winGroup === 'vegetable' ? 'الخضار' : 
               special.winGroup === 'all' ? 'الكل' : 'عالي القيمة'}؟</p>
        </div>
        `;

        // إزالة أي مستمعي أحداث سابقين
        const oldConfirmBtn = document.getElementById('confirmWinnerBtn');
        const oldCancelBtn = document.getElementById('cancelWinnerBtn');

        if (oldConfirmBtn && oldCancelBtn) {
            const newConfirmBtn = oldConfirmBtn.cloneNode(true);
            const newCancelBtn = oldCancelBtn.cloneNode(true);

            oldConfirmBtn.parentNode.replaceChild(newConfirmBtn, oldConfirmBtn);
            oldCancelBtn.parentNode.replaceChild(newCancelBtn, oldCancelBtn);

            newConfirmBtn.onclick = () => {
                this.declareSpecialWinner(special.id);
                modal.classList.remove('active');
            };

            newCancelBtn.onclick = () => {
                modal.classList.remove('active');
            };
        }

        modal.classList.add('active');
    },

    playBarSound: function(barType) {
        if (!state.settings.sound) return;

        const predictions = predictionEngine.lastPredictions[barType];
        if (predictions && predictions.length > 0) {
            const emojis = predictions.slice(0, 3).map(p => p.emoji);
            audioSystem.playSequence(emojis);
        }
    },

    spinWheel: function() {
        if (state.settings.showAnimations) {
            const wheel = document.getElementById('gameWheel');
            const spinBtn = document.getElementById('spinWheelBtn');
            const stopBtn = document.getElementById('stopWheelBtn');
            
            if (wheel && spinBtn && stopBtn) {
                // تفعيل الحركة
                wheel.style.animation = 'spin 2s linear infinite';
                spinBtn.disabled = true;
                stopBtn.disabled = false;
                
                // تشغيل صوت التدوير
                audioSystem.playSpinSound();
                
                // إيقاف تلقائي بعد 3-5 ثواني
                setTimeout(() => {
                    this.stopWheel();
                    this.selectRandomWinner();
                }, 3000 + Math.random() * 2000);
            }
        } else {
            this.selectRandomWinner();
        }
    },

    stopWheel: function() {
        const wheel = document.getElementById('gameWheel');
        const spinBtn = document.getElementById('spinWheelBtn');
        const stopBtn = document.getElementById('stopWheelBtn');
        
        if (wheel && spinBtn && stopBtn) {
            wheel.style.animation = '';
            spinBtn.disabled = false;
            stopBtn.disabled = true;
        }
    },

    spinAndSelectWinner: function() {
        if (state.settings.showAnimations) {
            this.spinWheel();
        } else {
            this.selectRandomWinner();
        }
    },

    selectRandomWinner: function() {
        const randomIndex = Math.floor(Math.random() * state.options.length);
        const randomOption = state.options[randomIndex];
        this.declareWinner(randomOption.id);
    },

    startTimers: function() {
        // تحديث المخاطر كل 5 ثواني
        setInterval(() => {
            this.updateRiskDisplay();
        }, 5000);

        // الحفظ التلقائي كل 30 ثانية
        if (state.settings.autoSave) {
            setInterval(() => {
                this.saveState();
            }, 30000);
        }

        // النسخ الاحتياطي التلقائي
        if (state.backup.enabled) {
            setInterval(() => {
                backupSystem.createBackup();
            }, (state.backup.backupInterval || 5) * 60000);
        }

        // تحديث مدة الجلسة كل دقيقة
        setInterval(() => {
            const sessionTimeElement = document.getElementById('sessionTime');
            if (sessionTimeElement) {
                const minutes = Math.floor((Date.now() - state.session.startTime) / 60000);
                const hours = Math.floor(minutes / 60);
                const mins = minutes % 60;
                sessionTimeElement.textContent = hours > 0 ?
                    `${hours}:${mins.toString().padStart(2, '0')}` :
                    `${mins.toString().padStart(2, '0')}:00`;
                
                state.session.duration = minutes;
            }
            
            // تحديث تقدم الجلسة
            const sessionProgress = document.getElementById('sessionProgress');
            if (sessionProgress) {
                const progress = Math.min(100, (state.session.duration / 120) * 100); // أقصى 120 دقيقة
                sessionProgress.style.width = `${progress}%`;
            }
        }, 60000);

        // تحديث الإحصائيات حسب الإعدادات
        setInterval(() => {
            this.updateDashboard();
        }, (state.settings.statsRefresh || 5) * 1000);

        // تحديث معلومات النظام كل دقيقة
        setInterval(() => {
            this.updateSystemInfo();
        }, 60000);
    },

    updateSystemInfo: function() {
        // حساب استخدام الذاكرة
        const stateSize = JSON.stringify(state).length;
        const localStorageSize = Object.keys(localStorage).reduce((total, key) => {
            return total + (localStorage.getItem(key)?.length || 0);
        }, 0);
        
        state.system.memoryUsage = Math.round((stateSize + localStorageSize) / 1024);
        
        const memoryUsageElement = document.getElementById('memoryUsage');
        if (memoryUsageElement) {
            memoryUsageElement.textContent = state.system.memoryUsage + ' MB';
        }
    },

    optimizeSystem: function() {
        console.log('🔧 تحسين النظام...');
        
        // تقليل حجم السجل
        if (state.history.length > 100) {
            state.history = state.history.slice(0, 100);
        }
        
        if (state.aiMemory.history.length > state.settings.memorySize) {
            state.aiMemory.history = state.aiMemory.history.slice(-state.settings.memorySize);
        }
        
        // تنظيف البيانات المؤقتة
        state.spinHistory = [];
        state.patternMemory = state.patternMemory.slice(-50);
        
        // حفظ الحالة
        this.saveState();
        
        state.system.lastOptimization = new Date().toISOString();
        
        this.updateSystemInfo();
        this.showNotification('تم التحسين', 'تم تحسين أداء النظام بنجاح', 'success');
    },

    diagnoseSystem: function() {
        const diagnostics = {
            stateSize: JSON.stringify(state).length,
            localStorageSize: Object.keys(localStorage).reduce((total, key) => {
                return total + (localStorage.getItem(key)?.length || 0);
            }, 0),
            historyCount: state.history.length,
            memoryPatterns: Object.keys(state.aiMemory.patterns || {}).length,
            currentBets: Object.keys(state.currentBets).length,
            performanceScore: state.performanceScore,
            riskLevel: state.riskLevel,
            accuracy: state.accuracy.pro || 0
        };
        
        state.system.diagnostics = diagnostics;
        
        let report = '<div class="diagnostics-report">';
        report += '<h4>تشخيص النظام:</h4>';
        report += `<p><strong>حجم الحالة:</strong> ${Math.round(diagnostics.stateSize / 1024)} KB</p>`;
        report += `<p><strong>حجم التخزين المحلي:</strong> ${Math.round(diagnostics.localStorageSize / 1024)} KB</p>`;
        report += `<p><strong>عدد النتائج المسجلة:</strong> ${diagnostics.historyCount}</p>`;
        report += `<p><strong>أنماط التعلم:</strong> ${diagnostics.memoryPatterns}</p>`;
        report += `<p><strong>الرهانات الحالية:</strong> ${diagnostics.currentBets}</p>`;
        report += `<p><strong>مستوى الأداء:</strong> ${diagnostics.performanceScore}/100</p>`;
        report += `<p><strong>مستوى المخاطرة:</strong> ${Math.round(diagnostics.riskLevel * 100)}%</p>`;
        report += `<p><strong>دقة التنبؤ:</strong> ${Math.round(diagnostics.accuracy)}%</p>`;
        report += '</div>';
        
        this.showNotification('تشخيص النظام', 'تم تشخيص النظام بنجاح', 'info');
        
        // عرض التقرير في نافذة
        const modal = document.getElementById('reportsModal');
        const content = document.getElementById('reportsContent');
        
        if (modal && content) {
            content.innerHTML = report;
            modal.classList.add('active');
        }
    },

    exportLogs: function() {
        const logs = {
            systemState: state,
            diagnostics: state.system.diagnostics,
            timestamp: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(logs, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const a = document.createElement('a');

        a.href = url;
        a.download = `system_logs_${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('تم تصدير السجلات', 'تم تصدير سجلات النظام بنجاح', 'success');
    },

    showNotification: function(title, message, type = 'info') {
        if (!state.settings.notifications) return;

        const container = document.getElementById('notificationsContainer');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 
                         type === 'warning' ? 'exclamation-triangle' : 
                         type === 'error' ? 'times-circle' : 'info-circle'}"></i>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        `;

        container.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'notificationSlideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }
};

// ========== 14. تهيئة النظام عند تحميل الصفحة ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 تم تحميل DOM، جاري تهيئة النظام...');

    // تعيين الدوال للنطاق العالمي
    window.toggleControlPanel = UI.toggleControlPanel.bind(UI);
    window.closeControlPanel = UI.closeControlPanel.bind(UI);
    window.closeBackupModal = closeBackupModal;
    window.closeReportsModal = closeReportsModal;
    window.closeHelpModal = closeHelpModal;
    window.resetGame = resetGame;
    window.addBalance = addBalance;
    window.reorderWheel = reorderWheel;
    window.removeLastResult = removeLastResult;
    window.forceWin = forceWin;
    window.unlockAllFeatures = unlockAllFeatures;
    window.showHelp = showHelp;

    // تهيئة النظام
    try {
        UI.init();
    } catch (error) {
        console.error('❌ خطأ فادح في تهيئة النظام:', error);
        alert('حدث خطأ في تحميل النظام. يرجى تحديث الصفحة.');
    }

    // إضافة أنماط إضافية
    const fixStyle = document.createElement('style');
    fixStyle.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .wheel {
        transition: transform 0.5s ease-out;
    }
    
    .diagnostics-report {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 10px;
        border: 1px solid #dee2e6;
    }
    
    .diagnostics-report h4 {
        color: #0b66ff;
        margin-bottom: 10px;
        border-bottom: 2px solid #0b66ff;
        padding-bottom: 5px;
    }
    
    .diagnostics-report p {
        margin: 8px 0;
        display: flex;
        justify-content: space-between;
    }
    
    .diagnostics-report strong {
        color: #495057;
    }
    
    .help-section {
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e9ecef;
    }
    
    .help-section:last-child {
        border-bottom: none;
    }
    
    .help-section h4 {
        color: #0b66ff;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .help-section p {
        margin: 5px 0;
        padding-right: 10px;
        color: #495057;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    `;
    document.head.appendChild(fixStyle);

    // حفظ التغييرات عند إغلاق الصفحة
    window.addEventListener('beforeunload', function() {
        if (state.settings.autoSave) {
            UI.saveState();
            settingsManager.saveSettings();
        }
    });

    // تفعيل التبويب الأول في لوحة التحكم عند الفتح
    setTimeout(() => {
        const firstTabBtn = document.querySelector('.tab-btn[data-tab="control"]');
        if (firstTabBtn) {
            firstTabBtn.click();
        }
    }, 100);
});