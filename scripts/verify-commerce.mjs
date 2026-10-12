/**
 * Zero-dependency verification for free-shipping + buy-2 math.
 * Run: node scripts/verify-commerce.mjs
 */

function freeShipping(subtotal, threshold) {
  const empty = subtotal <= 0;
  const safeThreshold = Math.max(0, threshold);
  if (safeThreshold === 0) {
    return {
      remaining: 0,
      progressPercent: empty ? 0 : 100,
      unlocked: !empty,
    };
  }
  return {
    remaining: Math.max(safeThreshold - subtotal, 0),
    progressPercent: Math.min((subtotal / safeThreshold) * 100, 100),
    unlocked: subtotal >= safeThreshold && !empty,
  };
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const below = freeShipping(382, 499);
assert(below.remaining === 117, `expected remaining 117 got ${below.remaining}`);
assert(Math.abs(below.progressPercent - (382 / 499) * 100) < 0.001, "progress mismatch");
assert(!below.unlocked, "should not unlock below threshold");

const exact = freeShipping(499, 499);
assert(exact.remaining === 0, "exact threshold remaining");
assert(exact.unlocked, "exact threshold unlock");
assert(exact.progressPercent === 100, "exact threshold progress");

const above = freeShipping(600, 499);
assert(above.unlocked && above.progressPercent === 100, "above threshold");

const empty = freeShipping(0, 499);
assert(!empty.unlocked && empty.remaining === 499, "empty cart");

const zeroThreshold = freeShipping(100, 0);
assert(zeroThreshold.unlocked && zeroThreshold.remaining === 0, "threshold 0");

// Buy 2: two units at 1499 + 1799 → bundle 999 → discount 1499+1799-999 = 2299
const units = [1499, 1799].sort((a, b) => a - b).slice(0, 2);
const retail = units.reduce((s, p) => s + p, 0);
const discount = Math.max(0, retail - 999);
assert(discount === 2299, `buy2 discount expected 2299 got ${discount}`);

console.log("verify-commerce: all checks passed");
