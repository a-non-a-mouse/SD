/*! For license information please see main.801db08b.js.LICENSE.txt */
(() => {
  var e = {
      497: (e, t, n) => {
        'use strict';
        var r = n(218);
        function a() {}
        function l() {}
        (l.resetWarningCache = a),
          (e.exports = function () {
            function e(e, t, n, a, l, o) {
              if (o !== r) {
                var i = new Error(
                  'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
                );
                throw ((i.name = 'Invariant Violation'), i);
              }
            }
            function t() {
              return e;
            }
            e.isRequired = e;
            var n = {
              array: e,
              bigint: e,
              bool: e,
              func: e,
              number: e,
              object: e,
              string: e,
              symbol: e,
              any: e,
              arrayOf: t,
              element: e,
              elementType: e,
              instanceOf: t,
              node: e,
              objectOf: t,
              oneOf: t,
              oneOfType: t,
              shape: t,
              exact: t,
              checkPropTypes: l,
              resetWarningCache: a,
            };
            return (n.PropTypes = n), n;
          });
      },
      173: (e, t, n) => {
        e.exports = n(497)();
      },
      218: (e) => {
        'use strict';
        e.exports = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
      },
      343: (e, t, n) => {
        var r = n(957);
        function a(e) {
          (this.mode = r.MODE_8BIT_BYTE), (this.data = e);
        }
        (a.prototype = {
          getLength: function (e) {
            return this.data.length;
          },
          write: function (e) {
            for (var t = 0; t < this.data.length; t++)
              e.put(this.data.charCodeAt(t), 8);
          },
        }),
          (e.exports = a);
      },
      813: (e) => {
        function t() {
          (this.buffer = new Array()), (this.length = 0);
        }
        (t.prototype = {
          get: function (e) {
            var t = Math.floor(e / 8);
            return 1 == ((this.buffer[t] >>> (7 - (e % 8))) & 1);
          },
          put: function (e, t) {
            for (var n = 0; n < t; n++)
              this.putBit(1 == ((e >>> (t - n - 1)) & 1));
          },
          getLengthInBits: function () {
            return this.length;
          },
          putBit: function (e) {
            var t = Math.floor(this.length / 8);
            this.buffer.length <= t && this.buffer.push(0),
              e && (this.buffer[t] |= 128 >>> this.length % 8),
              this.length++;
          },
        }),
          (e.exports = t);
      },
      742: (e) => {
        e.exports = { L: 1, M: 0, Q: 3, H: 2 };
      },
      392: (e, t, n) => {
        var r = n(460);
        function a(e, t) {
          if (void 0 == e.length) throw new Error(e.length + '/' + t);
          for (var n = 0; n < e.length && 0 == e[n]; ) n++;
          this.num = new Array(e.length - n + t);
          for (var r = 0; r < e.length - n; r++) this.num[r] = e[r + n];
        }
        (a.prototype = {
          get: function (e) {
            return this.num[e];
          },
          getLength: function () {
            return this.num.length;
          },
          multiply: function (e) {
            for (
              var t = new Array(this.getLength() + e.getLength() - 1), n = 0;
              n < this.getLength();
              n++
            )
              for (var l = 0; l < e.getLength(); l++)
                t[n + l] ^= r.gexp(r.glog(this.get(n)) + r.glog(e.get(l)));
            return new a(t, 0);
          },
          mod: function (e) {
            if (this.getLength() - e.getLength() < 0) return this;
            for (
              var t = r.glog(this.get(0)) - r.glog(e.get(0)),
                n = new Array(this.getLength()),
                l = 0;
              l < this.getLength();
              l++
            )
              n[l] = this.get(l);
            for (l = 0; l < e.getLength(); l++)
              n[l] ^= r.gexp(r.glog(e.get(l)) + t);
            return new a(n, 0).mod(e);
          },
        }),
          (e.exports = a);
      },
      612: (e, t, n) => {
        var r = n(343),
          a = n(436),
          l = n(813),
          o = n(898),
          i = n(392);
        function u(e, t) {
          (this.typeNumber = e),
            (this.errorCorrectLevel = t),
            (this.modules = null),
            (this.moduleCount = 0),
            (this.dataCache = null),
            (this.dataList = []);
        }
        var s = u.prototype;
        (s.addData = function (e) {
          var t = new r(e);
          this.dataList.push(t), (this.dataCache = null);
        }),
          (s.isDark = function (e, t) {
            if (
              e < 0 ||
              this.moduleCount <= e ||
              t < 0 ||
              this.moduleCount <= t
            )
              throw new Error(e + ',' + t);
            return this.modules[e][t];
          }),
          (s.getModuleCount = function () {
            return this.moduleCount;
          }),
          (s.make = function () {
            if (this.typeNumber < 1) {
              var e = 1;
              for (e = 1; e < 40; e++) {
                for (
                  var t = a.getRSBlocks(e, this.errorCorrectLevel),
                    n = new l(),
                    r = 0,
                    i = 0;
                  i < t.length;
                  i++
                )
                  r += t[i].dataCount;
                for (i = 0; i < this.dataList.length; i++) {
                  var u = this.dataList[i];
                  n.put(u.mode, 4),
                    n.put(u.getLength(), o.getLengthInBits(u.mode, e)),
                    u.write(n);
                }
                if (n.getLengthInBits() <= 8 * r) break;
              }
              this.typeNumber = e;
            }
            this.makeImpl(!1, this.getBestMaskPattern());
          }),
          (s.makeImpl = function (e, t) {
            (this.moduleCount = 4 * this.typeNumber + 17),
              (this.modules = new Array(this.moduleCount));
            for (var n = 0; n < this.moduleCount; n++) {
              this.modules[n] = new Array(this.moduleCount);
              for (var r = 0; r < this.moduleCount; r++)
                this.modules[n][r] = null;
            }
            this.setupPositionProbePattern(0, 0),
              this.setupPositionProbePattern(this.moduleCount - 7, 0),
              this.setupPositionProbePattern(0, this.moduleCount - 7),
              this.setupPositionAdjustPattern(),
              this.setupTimingPattern(),
              this.setupTypeInfo(e, t),
              this.typeNumber >= 7 && this.setupTypeNumber(e),
              null == this.dataCache &&
                (this.dataCache = u.createData(
                  this.typeNumber,
                  this.errorCorrectLevel,
                  this.dataList
                )),
              this.mapData(this.dataCache, t);
          }),
          (s.setupPositionProbePattern = function (e, t) {
            for (var n = -1; n <= 7; n++)
              if (!(e + n <= -1 || this.moduleCount <= e + n))
                for (var r = -1; r <= 7; r++)
                  t + r <= -1 ||
                    this.moduleCount <= t + r ||
                    (this.modules[e + n][t + r] =
                      (0 <= n && n <= 6 && (0 == r || 6 == r)) ||
                      (0 <= r && r <= 6 && (0 == n || 6 == n)) ||
                      (2 <= n && n <= 4 && 2 <= r && r <= 4));
          }),
          (s.getBestMaskPattern = function () {
            for (var e = 0, t = 0, n = 0; n < 8; n++) {
              this.makeImpl(!0, n);
              var r = o.getLostPoint(this);
              (0 == n || e > r) && ((e = r), (t = n));
            }
            return t;
          }),
          (s.createMovieClip = function (e, t, n) {
            var r = e.createEmptyMovieClip(t, n);
            this.make();
            for (var a = 0; a < this.modules.length; a++)
              for (var l = 1 * a, o = 0; o < this.modules[a].length; o++) {
                var i = 1 * o;
                this.modules[a][o] &&
                  (r.beginFill(0, 100),
                  r.moveTo(i, l),
                  r.lineTo(i + 1, l),
                  r.lineTo(i + 1, l + 1),
                  r.lineTo(i, l + 1),
                  r.endFill());
              }
            return r;
          }),
          (s.setupTimingPattern = function () {
            for (var e = 8; e < this.moduleCount - 8; e++)
              null == this.modules[e][6] && (this.modules[e][6] = e % 2 == 0);
            for (var t = 8; t < this.moduleCount - 8; t++)
              null == this.modules[6][t] && (this.modules[6][t] = t % 2 == 0);
          }),
          (s.setupPositionAdjustPattern = function () {
            for (
              var e = o.getPatternPosition(this.typeNumber), t = 0;
              t < e.length;
              t++
            )
              for (var n = 0; n < e.length; n++) {
                var r = e[t],
                  a = e[n];
                if (null == this.modules[r][a])
                  for (var l = -2; l <= 2; l++)
                    for (var i = -2; i <= 2; i++)
                      this.modules[r + l][a + i] =
                        -2 == l ||
                        2 == l ||
                        -2 == i ||
                        2 == i ||
                        (0 == l && 0 == i);
              }
          }),
          (s.setupTypeNumber = function (e) {
            for (
              var t = o.getBCHTypeNumber(this.typeNumber), n = 0;
              n < 18;
              n++
            ) {
              var r = !e && 1 == ((t >> n) & 1);
              this.modules[Math.floor(n / 3)][
                (n % 3) + this.moduleCount - 8 - 3
              ] = r;
            }
            for (n = 0; n < 18; n++) {
              r = !e && 1 == ((t >> n) & 1);
              this.modules[(n % 3) + this.moduleCount - 8 - 3][
                Math.floor(n / 3)
              ] = r;
            }
          }),
          (s.setupTypeInfo = function (e, t) {
            for (
              var n = (this.errorCorrectLevel << 3) | t,
                r = o.getBCHTypeInfo(n),
                a = 0;
              a < 15;
              a++
            ) {
              var l = !e && 1 == ((r >> a) & 1);
              a < 6
                ? (this.modules[a][8] = l)
                : a < 8
                ? (this.modules[a + 1][8] = l)
                : (this.modules[this.moduleCount - 15 + a][8] = l);
            }
            for (a = 0; a < 15; a++) {
              l = !e && 1 == ((r >> a) & 1);
              a < 8
                ? (this.modules[8][this.moduleCount - a - 1] = l)
                : a < 9
                ? (this.modules[8][15 - a - 1 + 1] = l)
                : (this.modules[8][15 - a - 1] = l);
            }
            this.modules[this.moduleCount - 8][8] = !e;
          }),
          (s.mapData = function (e, t) {
            for (
              var n = -1,
                r = this.moduleCount - 1,
                a = 7,
                l = 0,
                i = this.moduleCount - 1;
              i > 0;
              i -= 2
            )
              for (6 == i && i--; ; ) {
                for (var u = 0; u < 2; u++)
                  if (null == this.modules[r][i - u]) {
                    var s = !1;
                    l < e.length && (s = 1 == ((e[l] >>> a) & 1)),
                      o.getMask(t, r, i - u) && (s = !s),
                      (this.modules[r][i - u] = s),
                      -1 == --a && (l++, (a = 7));
                  }
                if ((r += n) < 0 || this.moduleCount <= r) {
                  (r -= n), (n = -n);
                  break;
                }
              }
          }),
          (u.PAD0 = 236),
          (u.PAD1 = 17),
          (u.createData = function (e, t, n) {
            for (
              var r = a.getRSBlocks(e, t), i = new l(), s = 0;
              s < n.length;
              s++
            ) {
              var c = n[s];
              i.put(c.mode, 4),
                i.put(c.getLength(), o.getLengthInBits(c.mode, e)),
                c.write(i);
            }
            var d = 0;
            for (s = 0; s < r.length; s++) d += r[s].dataCount;
            if (i.getLengthInBits() > 8 * d)
              throw new Error(
                'code length overflow. (' +
                  i.getLengthInBits() +
                  '>' +
                  8 * d +
                  ')'
              );
            for (
              i.getLengthInBits() + 4 <= 8 * d && i.put(0, 4);
              i.getLengthInBits() % 8 != 0;

            )
              i.putBit(!1);
            for (
              ;
              !(i.getLengthInBits() >= 8 * d) &&
              (i.put(u.PAD0, 8), !(i.getLengthInBits() >= 8 * d));

            )
              i.put(u.PAD1, 8);
            return u.createBytes(i, r);
          }),
          (u.createBytes = function (e, t) {
            for (
              var n = 0,
                r = 0,
                a = 0,
                l = new Array(t.length),
                u = new Array(t.length),
                s = 0;
              s < t.length;
              s++
            ) {
              var c = t[s].dataCount,
                d = t[s].totalCount - c;
              (r = Math.max(r, c)), (a = Math.max(a, d)), (l[s] = new Array(c));
              for (var f = 0; f < l[s].length; f++)
                l[s][f] = 255 & e.buffer[f + n];
              n += c;
              var p = o.getErrorCorrectPolynomial(d),
                h = new i(l[s], p.getLength() - 1).mod(p);
              u[s] = new Array(p.getLength() - 1);
              for (f = 0; f < u[s].length; f++) {
                var m = f + h.getLength() - u[s].length;
                u[s][f] = m >= 0 ? h.get(m) : 0;
              }
            }
            var g = 0;
            for (f = 0; f < t.length; f++) g += t[f].totalCount;
            var v = new Array(g),
              y = 0;
            for (f = 0; f < r; f++)
              for (s = 0; s < t.length; s++)
                f < l[s].length && (v[y++] = l[s][f]);
            for (f = 0; f < a; f++)
              for (s = 0; s < t.length; s++)
                f < u[s].length && (v[y++] = u[s][f]);
            return v;
          }),
          (e.exports = u);
      },
      436: (e, t, n) => {
        var r = n(742);
        function a(e, t) {
          (this.totalCount = e), (this.dataCount = t);
        }
        (a.RS_BLOCK_TABLE = [
          [1, 26, 19],
          [1, 26, 16],
          [1, 26, 13],
          [1, 26, 9],
          [1, 44, 34],
          [1, 44, 28],
          [1, 44, 22],
          [1, 44, 16],
          [1, 70, 55],
          [1, 70, 44],
          [2, 35, 17],
          [2, 35, 13],
          [1, 100, 80],
          [2, 50, 32],
          [2, 50, 24],
          [4, 25, 9],
          [1, 134, 108],
          [2, 67, 43],
          [2, 33, 15, 2, 34, 16],
          [2, 33, 11, 2, 34, 12],
          [2, 86, 68],
          [4, 43, 27],
          [4, 43, 19],
          [4, 43, 15],
          [2, 98, 78],
          [4, 49, 31],
          [2, 32, 14, 4, 33, 15],
          [4, 39, 13, 1, 40, 14],
          [2, 121, 97],
          [2, 60, 38, 2, 61, 39],
          [4, 40, 18, 2, 41, 19],
          [4, 40, 14, 2, 41, 15],
          [2, 146, 116],
          [3, 58, 36, 2, 59, 37],
          [4, 36, 16, 4, 37, 17],
          [4, 36, 12, 4, 37, 13],
          [2, 86, 68, 2, 87, 69],
          [4, 69, 43, 1, 70, 44],
          [6, 43, 19, 2, 44, 20],
          [6, 43, 15, 2, 44, 16],
          [4, 101, 81],
          [1, 80, 50, 4, 81, 51],
          [4, 50, 22, 4, 51, 23],
          [3, 36, 12, 8, 37, 13],
          [2, 116, 92, 2, 117, 93],
          [6, 58, 36, 2, 59, 37],
          [4, 46, 20, 6, 47, 21],
          [7, 42, 14, 4, 43, 15],
          [4, 133, 107],
          [8, 59, 37, 1, 60, 38],
          [8, 44, 20, 4, 45, 21],
          [12, 33, 11, 4, 34, 12],
          [3, 145, 115, 1, 146, 116],
          [4, 64, 40, 5, 65, 41],
          [11, 36, 16, 5, 37, 17],
          [11, 36, 12, 5, 37, 13],
          [5, 109, 87, 1, 110, 88],
          [5, 65, 41, 5, 66, 42],
          [5, 54, 24, 7, 55, 25],
          [11, 36, 12],
          [5, 122, 98, 1, 123, 99],
          [7, 73, 45, 3, 74, 46],
          [15, 43, 19, 2, 44, 20],
          [3, 45, 15, 13, 46, 16],
          [1, 135, 107, 5, 136, 108],
          [10, 74, 46, 1, 75, 47],
          [1, 50, 22, 15, 51, 23],
          [2, 42, 14, 17, 43, 15],
          [5, 150, 120, 1, 151, 121],
          [9, 69, 43, 4, 70, 44],
          [17, 50, 22, 1, 51, 23],
          [2, 42, 14, 19, 43, 15],
          [3, 141, 113, 4, 142, 114],
          [3, 70, 44, 11, 71, 45],
          [17, 47, 21, 4, 48, 22],
          [9, 39, 13, 16, 40, 14],
          [3, 135, 107, 5, 136, 108],
          [3, 67, 41, 13, 68, 42],
          [15, 54, 24, 5, 55, 25],
          [15, 43, 15, 10, 44, 16],
          [4, 144, 116, 4, 145, 117],
          [17, 68, 42],
          [17, 50, 22, 6, 51, 23],
          [19, 46, 16, 6, 47, 17],
          [2, 139, 111, 7, 140, 112],
          [17, 74, 46],
          [7, 54, 24, 16, 55, 25],
          [34, 37, 13],
          [4, 151, 121, 5, 152, 122],
          [4, 75, 47, 14, 76, 48],
          [11, 54, 24, 14, 55, 25],
          [16, 45, 15, 14, 46, 16],
          [6, 147, 117, 4, 148, 118],
          [6, 73, 45, 14, 74, 46],
          [11, 54, 24, 16, 55, 25],
          [30, 46, 16, 2, 47, 17],
          [8, 132, 106, 4, 133, 107],
          [8, 75, 47, 13, 76, 48],
          [7, 54, 24, 22, 55, 25],
          [22, 45, 15, 13, 46, 16],
          [10, 142, 114, 2, 143, 115],
          [19, 74, 46, 4, 75, 47],
          [28, 50, 22, 6, 51, 23],
          [33, 46, 16, 4, 47, 17],
          [8, 152, 122, 4, 153, 123],
          [22, 73, 45, 3, 74, 46],
          [8, 53, 23, 26, 54, 24],
          [12, 45, 15, 28, 46, 16],
          [3, 147, 117, 10, 148, 118],
          [3, 73, 45, 23, 74, 46],
          [4, 54, 24, 31, 55, 25],
          [11, 45, 15, 31, 46, 16],
          [7, 146, 116, 7, 147, 117],
          [21, 73, 45, 7, 74, 46],
          [1, 53, 23, 37, 54, 24],
          [19, 45, 15, 26, 46, 16],
          [5, 145, 115, 10, 146, 116],
          [19, 75, 47, 10, 76, 48],
          [15, 54, 24, 25, 55, 25],
          [23, 45, 15, 25, 46, 16],
          [13, 145, 115, 3, 146, 116],
          [2, 74, 46, 29, 75, 47],
          [42, 54, 24, 1, 55, 25],
          [23, 45, 15, 28, 46, 16],
          [17, 145, 115],
          [10, 74, 46, 23, 75, 47],
          [10, 54, 24, 35, 55, 25],
          [19, 45, 15, 35, 46, 16],
          [17, 145, 115, 1, 146, 116],
          [14, 74, 46, 21, 75, 47],
          [29, 54, 24, 19, 55, 25],
          [11, 45, 15, 46, 46, 16],
          [13, 145, 115, 6, 146, 116],
          [14, 74, 46, 23, 75, 47],
          [44, 54, 24, 7, 55, 25],
          [59, 46, 16, 1, 47, 17],
          [12, 151, 121, 7, 152, 122],
          [12, 75, 47, 26, 76, 48],
          [39, 54, 24, 14, 55, 25],
          [22, 45, 15, 41, 46, 16],
          [6, 151, 121, 14, 152, 122],
          [6, 75, 47, 34, 76, 48],
          [46, 54, 24, 10, 55, 25],
          [2, 45, 15, 64, 46, 16],
          [17, 152, 122, 4, 153, 123],
          [29, 74, 46, 14, 75, 47],
          [49, 54, 24, 10, 55, 25],
          [24, 45, 15, 46, 46, 16],
          [4, 152, 122, 18, 153, 123],
          [13, 74, 46, 32, 75, 47],
          [48, 54, 24, 14, 55, 25],
          [42, 45, 15, 32, 46, 16],
          [20, 147, 117, 4, 148, 118],
          [40, 75, 47, 7, 76, 48],
          [43, 54, 24, 22, 55, 25],
          [10, 45, 15, 67, 46, 16],
          [19, 148, 118, 6, 149, 119],
          [18, 75, 47, 31, 76, 48],
          [34, 54, 24, 34, 55, 25],
          [20, 45, 15, 61, 46, 16],
        ]),
          (a.getRSBlocks = function (e, t) {
            var n = a.getRsBlockTable(e, t);
            if (void 0 == n)
              throw new Error(
                'bad rs block @ typeNumber:' + e + '/errorCorrectLevel:' + t
              );
            for (var r = n.length / 3, l = new Array(), o = 0; o < r; o++)
              for (
                var i = n[3 * o + 0], u = n[3 * o + 1], s = n[3 * o + 2], c = 0;
                c < i;
                c++
              )
                l.push(new a(u, s));
            return l;
          }),
          (a.getRsBlockTable = function (e, t) {
            switch (t) {
              case r.L:
                return a.RS_BLOCK_TABLE[4 * (e - 1) + 0];
              case r.M:
                return a.RS_BLOCK_TABLE[4 * (e - 1) + 1];
              case r.Q:
                return a.RS_BLOCK_TABLE[4 * (e - 1) + 2];
              case r.H:
                return a.RS_BLOCK_TABLE[4 * (e - 1) + 3];
              default:
                return;
            }
          }),
          (e.exports = a);
      },
      460: (e) => {
        for (
          var t = {
              glog: function (e) {
                if (e < 1) throw new Error('glog(' + e + ')');
                return t.LOG_TABLE[e];
              },
              gexp: function (e) {
                for (; e < 0; ) e += 255;
                for (; e >= 256; ) e -= 255;
                return t.EXP_TABLE[e];
              },
              EXP_TABLE: new Array(256),
              LOG_TABLE: new Array(256),
            },
            n = 0;
          n < 8;
          n++
        )
          t.EXP_TABLE[n] = 1 << n;
        for (n = 8; n < 256; n++)
          t.EXP_TABLE[n] =
            t.EXP_TABLE[n - 4] ^
            t.EXP_TABLE[n - 5] ^
            t.EXP_TABLE[n - 6] ^
            t.EXP_TABLE[n - 8];
        for (n = 0; n < 255; n++) t.LOG_TABLE[t.EXP_TABLE[n]] = n;
        e.exports = t;
      },
      957: (e) => {
        e.exports = {
          MODE_NUMBER: 1,
          MODE_ALPHA_NUM: 2,
          MODE_8BIT_BYTE: 4,
          MODE_KANJI: 8,
        };
      },
      898: (e, t, n) => {
        var r = n(957),
          a = n(392),
          l = n(460),
          o = 0,
          i = 1,
          u = 2,
          s = 3,
          c = 4,
          d = 5,
          f = 6,
          p = 7,
          h = {
            PATTERN_POSITION_TABLE: [
              [],
              [6, 18],
              [6, 22],
              [6, 26],
              [6, 30],
              [6, 34],
              [6, 22, 38],
              [6, 24, 42],
              [6, 26, 46],
              [6, 28, 50],
              [6, 30, 54],
              [6, 32, 58],
              [6, 34, 62],
              [6, 26, 46, 66],
              [6, 26, 48, 70],
              [6, 26, 50, 74],
              [6, 30, 54, 78],
              [6, 30, 56, 82],
              [6, 30, 58, 86],
              [6, 34, 62, 90],
              [6, 28, 50, 72, 94],
              [6, 26, 50, 74, 98],
              [6, 30, 54, 78, 102],
              [6, 28, 54, 80, 106],
              [6, 32, 58, 84, 110],
              [6, 30, 58, 86, 114],
              [6, 34, 62, 90, 118],
              [6, 26, 50, 74, 98, 122],
              [6, 30, 54, 78, 102, 126],
              [6, 26, 52, 78, 104, 130],
              [6, 30, 56, 82, 108, 134],
              [6, 34, 60, 86, 112, 138],
              [6, 30, 58, 86, 114, 142],
              [6, 34, 62, 90, 118, 146],
              [6, 30, 54, 78, 102, 126, 150],
              [6, 24, 50, 76, 102, 128, 154],
              [6, 28, 54, 80, 106, 132, 158],
              [6, 32, 58, 84, 110, 136, 162],
              [6, 26, 54, 82, 110, 138, 166],
              [6, 30, 58, 86, 114, 142, 170],
            ],
            G15: 1335,
            G18: 7973,
            G15_MASK: 21522,
            getBCHTypeInfo: function (e) {
              for (
                var t = e << 10;
                h.getBCHDigit(t) - h.getBCHDigit(h.G15) >= 0;

              )
                t ^= h.G15 << (h.getBCHDigit(t) - h.getBCHDigit(h.G15));
              return ((e << 10) | t) ^ h.G15_MASK;
            },
            getBCHTypeNumber: function (e) {
              for (
                var t = e << 12;
                h.getBCHDigit(t) - h.getBCHDigit(h.G18) >= 0;

              )
                t ^= h.G18 << (h.getBCHDigit(t) - h.getBCHDigit(h.G18));
              return (e << 12) | t;
            },
            getBCHDigit: function (e) {
              for (var t = 0; 0 != e; ) t++, (e >>>= 1);
              return t;
            },
            getPatternPosition: function (e) {
              return h.PATTERN_POSITION_TABLE[e - 1];
            },
            getMask: function (e, t, n) {
              switch (e) {
                case o:
                  return (t + n) % 2 == 0;
                case i:
                  return t % 2 == 0;
                case u:
                  return n % 3 == 0;
                case s:
                  return (t + n) % 3 == 0;
                case c:
                  return (Math.floor(t / 2) + Math.floor(n / 3)) % 2 == 0;
                case d:
                  return ((t * n) % 2) + ((t * n) % 3) == 0;
                case f:
                  return (((t * n) % 2) + ((t * n) % 3)) % 2 == 0;
                case p:
                  return (((t * n) % 3) + ((t + n) % 2)) % 2 == 0;
                default:
                  throw new Error('bad maskPattern:' + e);
              }
            },
            getErrorCorrectPolynomial: function (e) {
              for (var t = new a([1], 0), n = 0; n < e; n++)
                t = t.multiply(new a([1, l.gexp(n)], 0));
              return t;
            },
            getLengthInBits: function (e, t) {
              if (1 <= t && t < 10)
                switch (e) {
                  case r.MODE_NUMBER:
                    return 10;
                  case r.MODE_ALPHA_NUM:
                    return 9;
                  case r.MODE_8BIT_BYTE:
                  case r.MODE_KANJI:
                    return 8;
                  default:
                    throw new Error('mode:' + e);
                }
              else if (t < 27)
                switch (e) {
                  case r.MODE_NUMBER:
                    return 12;
                  case r.MODE_ALPHA_NUM:
                    return 11;
                  case r.MODE_8BIT_BYTE:
                    return 16;
                  case r.MODE_KANJI:
                    return 10;
                  default:
                    throw new Error('mode:' + e);
                }
              else {
                if (!(t < 41)) throw new Error('type:' + t);
                switch (e) {
                  case r.MODE_NUMBER:
                    return 14;
                  case r.MODE_ALPHA_NUM:
                    return 13;
                  case r.MODE_8BIT_BYTE:
                    return 16;
                  case r.MODE_KANJI:
                    return 12;
                  default:
                    throw new Error('mode:' + e);
                }
              }
            },
            getLostPoint: function (e) {
              for (var t = e.getModuleCount(), n = 0, r = 0; r < t; r++)
                for (var a = 0; a < t; a++) {
                  for (var l = 0, o = e.isDark(r, a), i = -1; i <= 1; i++)
                    if (!(r + i < 0 || t <= r + i))
                      for (var u = -1; u <= 1; u++)
                        a + u < 0 ||
                          t <= a + u ||
                          (0 == i && 0 == u) ||
                          (o == e.isDark(r + i, a + u) && l++);
                  l > 5 && (n += 3 + l - 5);
                }
              for (r = 0; r < t - 1; r++)
                for (a = 0; a < t - 1; a++) {
                  var s = 0;
                  e.isDark(r, a) && s++,
                    e.isDark(r + 1, a) && s++,
                    e.isDark(r, a + 1) && s++,
                    e.isDark(r + 1, a + 1) && s++,
                    (0 != s && 4 != s) || (n += 3);
                }
              for (r = 0; r < t; r++)
                for (a = 0; a < t - 6; a++)
                  e.isDark(r, a) &&
                    !e.isDark(r, a + 1) &&
                    e.isDark(r, a + 2) &&
                    e.isDark(r, a + 3) &&
                    e.isDark(r, a + 4) &&
                    !e.isDark(r, a + 5) &&
                    e.isDark(r, a + 6) &&
                    (n += 40);
              for (a = 0; a < t; a++)
                for (r = 0; r < t - 6; r++)
                  e.isDark(r, a) &&
                    !e.isDark(r + 1, a) &&
                    e.isDark(r + 2, a) &&
                    e.isDark(r + 3, a) &&
                    e.isDark(r + 4, a) &&
                    !e.isDark(r + 5, a) &&
                    e.isDark(r + 6, a) &&
                    (n += 40);
              var c = 0;
              for (a = 0; a < t; a++)
                for (r = 0; r < t; r++) e.isDark(r, a) && c++;
              return (n += 10 * (Math.abs((100 * c) / t / t - 50) / 5));
            },
          };
        e.exports = h;
      },
      730: (e, t, n) => {
        'use strict';
        var r = n(43),
          a = n(853);
        function l(e) {
          for (
            var t =
                'https://reactjs.org/docs/error-decoder.html?invariant=' + e,
              n = 1;
            n < arguments.length;
            n++
          )
            t += '&args[]=' + encodeURIComponent(arguments[n]);
          return (
            'Minified React error #' +
            e +
            '; visit ' +
            t +
            ' for the full message or use the non-minified dev environment for full errors and additional helpful warnings.'
          );
        }
        var o = new Set(),
          i = {};
        function u(e, t) {
          s(e, t), s(e + 'Capture', t);
        }
        function s(e, t) {
          for (i[e] = t, e = 0; e < t.length; e++) o.add(t[e]);
        }
        var c = !(
            'undefined' === typeof window ||
            'undefined' === typeof window.document ||
            'undefined' === typeof window.document.createElement
          ),
          d = Object.prototype.hasOwnProperty,
          f =
            /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
          p = {},
          h = {};
        function m(e, t, n, r, a, l, o) {
          (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
            (this.attributeName = r),
            (this.attributeNamespace = a),
            (this.mustUseProperty = n),
            (this.propertyName = e),
            (this.type = t),
            (this.sanitizeURL = l),
            (this.removeEmptyString = o);
        }
        var g = {};
        'children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style'
          .split(' ')
          .forEach(function (e) {
            g[e] = new m(e, 0, !1, e, null, !1, !1);
          }),
          [
            ['acceptCharset', 'accept-charset'],
            ['className', 'class'],
            ['htmlFor', 'for'],
            ['httpEquiv', 'http-equiv'],
          ].forEach(function (e) {
            var t = e[0];
            g[t] = new m(t, 1, !1, e[1], null, !1, !1);
          }),
          ['contentEditable', 'draggable', 'spellCheck', 'value'].forEach(
            function (e) {
              g[e] = new m(e, 2, !1, e.toLowerCase(), null, !1, !1);
            }
          ),
          [
            'autoReverse',
            'externalResourcesRequired',
            'focusable',
            'preserveAlpha',
          ].forEach(function (e) {
            g[e] = new m(e, 2, !1, e, null, !1, !1);
          }),
          'allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope'
            .split(' ')
            .forEach(function (e) {
              g[e] = new m(e, 3, !1, e.toLowerCase(), null, !1, !1);
            }),
          ['checked', 'multiple', 'muted', 'selected'].forEach(function (e) {
            g[e] = new m(e, 3, !0, e, null, !1, !1);
          }),
          ['capture', 'download'].forEach(function (e) {
            g[e] = new m(e, 4, !1, e, null, !1, !1);
          }),
          ['cols', 'rows', 'size', 'span'].forEach(function (e) {
            g[e] = new m(e, 6, !1, e, null, !1, !1);
          }),
          ['rowSpan', 'start'].forEach(function (e) {
            g[e] = new m(e, 5, !1, e.toLowerCase(), null, !1, !1);
          });
        var v = /[\-:]([a-z])/g;
        function y(e) {
          return e[1].toUpperCase();
        }
        function b(e, t, n, r) {
          var a = g.hasOwnProperty(t) ? g[t] : null;
          (null !== a
            ? 0 !== a.type
            : r ||
              !(2 < t.length) ||
              ('o' !== t[0] && 'O' !== t[0]) ||
              ('n' !== t[1] && 'N' !== t[1])) &&
            ((function (e, t, n, r) {
              if (
                null === t ||
                'undefined' === typeof t ||
                (function (e, t, n, r) {
                  if (null !== n && 0 === n.type) return !1;
                  switch (typeof t) {
                    case 'function':
                    case 'symbol':
                      return !0;
                    case 'boolean':
                      return (
                        !r &&
                        (null !== n
                          ? !n.acceptsBooleans
                          : 'data-' !== (e = e.toLowerCase().slice(0, 5)) &&
                            'aria-' !== e)
                      );
                    default:
                      return !1;
                  }
                })(e, t, n, r)
              )
                return !0;
              if (r) return !1;
              if (null !== n)
                switch (n.type) {
                  case 3:
                    return !t;
                  case 4:
                    return !1 === t;
                  case 5:
                    return isNaN(t);
                  case 6:
                    return isNaN(t) || 1 > t;
                }
              return !1;
            })(t, n, a, r) && (n = null),
            r || null === a
              ? (function (e) {
                  return (
                    !!d.call(h, e) ||
                    (!d.call(p, e) &&
                      (f.test(e) ? (h[e] = !0) : ((p[e] = !0), !1)))
                  );
                })(t) &&
                (null === n ? e.removeAttribute(t) : e.setAttribute(t, '' + n))
              : a.mustUseProperty
              ? (e[a.propertyName] = null === n ? 3 !== a.type && '' : n)
              : ((t = a.attributeName),
                (r = a.attributeNamespace),
                null === n
                  ? e.removeAttribute(t)
                  : ((n =
                      3 === (a = a.type) || (4 === a && !0 === n)
                        ? ''
                        : '' + n),
                    r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
        }
        'accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height'
          .split(' ')
          .forEach(function (e) {
            var t = e.replace(v, y);
            g[t] = new m(t, 1, !1, e, null, !1, !1);
          }),
          'xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type'
            .split(' ')
            .forEach(function (e) {
              var t = e.replace(v, y);
              g[t] = new m(t, 1, !1, e, 'http://www.w3.org/1999/xlink', !1, !1);
            }),
          ['xml:base', 'xml:lang', 'xml:space'].forEach(function (e) {
            var t = e.replace(v, y);
            g[t] = new m(
              t,
              1,
              !1,
              e,
              'http://www.w3.org/XML/1998/namespace',
              !1,
              !1
            );
          }),
          ['tabIndex', 'crossOrigin'].forEach(function (e) {
            g[e] = new m(e, 1, !1, e.toLowerCase(), null, !1, !1);
          }),
          (g.xlinkHref = new m(
            'xlinkHref',
            1,
            !1,
            'xlink:href',
            'http://www.w3.org/1999/xlink',
            !0,
            !1
          )),
          ['src', 'href', 'action', 'formAction'].forEach(function (e) {
            g[e] = new m(e, 1, !1, e.toLowerCase(), null, !0, !0);
          });
        var k = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
          w = Symbol.for('react.element'),
          S = Symbol.for('react.portal'),
          _ = Symbol.for('react.fragment'),
          x = Symbol.for('react.strict_mode'),
          E = Symbol.for('react.profiler'),
          C = Symbol.for('react.provider'),
          N = Symbol.for('react.context'),
          L = Symbol.for('react.forward_ref'),
          T = Symbol.for('react.suspense'),
          P = Symbol.for('react.suspense_list'),
          A = Symbol.for('react.memo'),
          z = Symbol.for('react.lazy');
        Symbol.for('react.scope'), Symbol.for('react.debug_trace_mode');
        var j = Symbol.for('react.offscreen');
        Symbol.for('react.legacy_hidden'),
          Symbol.for('react.cache'),
          Symbol.for('react.tracing_marker');
        var O = Symbol.iterator;
        function R(e) {
          return null === e || 'object' !== typeof e
            ? null
            : 'function' === typeof (e = (O && e[O]) || e['@@iterator'])
            ? e
            : null;
        }
        var M,
          D = Object.assign;
        function F(e) {
          if (void 0 === M)
            try {
              throw Error();
            } catch (n) {
              var t = n.stack.trim().match(/\n( *(at )?)/);
              M = (t && t[1]) || '';
            }
          return '\n' + M + e;
        }
        var I = !1;
        function B(e, t) {
          if (!e || I) return '';
          I = !0;
          var n = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          try {
            if (t)
              if (
                ((t = function () {
                  throw Error();
                }),
                Object.defineProperty(t.prototype, 'props', {
                  set: function () {
                    throw Error();
                  },
                }),
                'object' === typeof Reflect && Reflect.construct)
              ) {
                try {
                  Reflect.construct(t, []);
                } catch (s) {
                  var r = s;
                }
                Reflect.construct(e, [], t);
              } else {
                try {
                  t.call();
                } catch (s) {
                  r = s;
                }
                e.call(t.prototype);
              }
            else {
              try {
                throw Error();
              } catch (s) {
                r = s;
              }
              e();
            }
          } catch (s) {
            if (s && r && 'string' === typeof s.stack) {
              for (
                var a = s.stack.split('\n'),
                  l = r.stack.split('\n'),
                  o = a.length - 1,
                  i = l.length - 1;
                1 <= o && 0 <= i && a[o] !== l[i];

              )
                i--;
              for (; 1 <= o && 0 <= i; o--, i--)
                if (a[o] !== l[i]) {
                  if (1 !== o || 1 !== i)
                    do {
                      if ((o--, 0 > --i || a[o] !== l[i])) {
                        var u = '\n' + a[o].replace(' at new ', ' at ');
                        return (
                          e.displayName &&
                            u.includes('<anonymous>') &&
                            (u = u.replace('<anonymous>', e.displayName)),
                          u
                        );
                      }
                    } while (1 <= o && 0 <= i);
                  break;
                }
            }
          } finally {
            (I = !1), (Error.prepareStackTrace = n);
          }
          return (e = e ? e.displayName || e.name : '') ? F(e) : '';
        }
        function V(e) {
          switch (e.tag) {
            case 5:
              return F(e.type);
            case 16:
              return F('Lazy');
            case 13:
              return F('Suspense');
            case 19:
              return F('SuspenseList');
            case 0:
            case 2:
            case 15:
              return (e = B(e.type, !1));
            case 11:
              return (e = B(e.type.render, !1));
            case 1:
              return (e = B(e.type, !0));
            default:
              return '';
          }
        }
        function H(e) {
          if (null == e) return null;
          if ('function' === typeof e) return e.displayName || e.name || null;
          if ('string' === typeof e) return e;
          switch (e) {
            case _:
              return 'Fragment';
            case S:
              return 'Portal';
            case E:
              return 'Profiler';
            case x:
              return 'StrictMode';
            case T:
              return 'Suspense';
            case P:
              return 'SuspenseList';
          }
          if ('object' === typeof e)
            switch (e.$$typeof) {
              case N:
                return (e.displayName || 'Context') + '.Consumer';
              case C:
                return (e._context.displayName || 'Context') + '.Provider';
              case L:
                var t = e.render;
                return (
                  (e = e.displayName) ||
                    (e =
                      '' !== (e = t.displayName || t.name || '')
                        ? 'ForwardRef(' + e + ')'
                        : 'ForwardRef'),
                  e
                );
              case A:
                return null !== (t = e.displayName || null)
                  ? t
                  : H(e.type) || 'Memo';
              case z:
                (t = e._payload), (e = e._init);
                try {
                  return H(e(t));
                } catch (n) {}
            }
          return null;
        }
        function U(e) {
          var t = e.type;
          switch (e.tag) {
            case 24:
              return 'Cache';
            case 9:
              return (t.displayName || 'Context') + '.Consumer';
            case 10:
              return (t._context.displayName || 'Context') + '.Provider';
            case 18:
              return 'DehydratedFragment';
            case 11:
              return (
                (e = (e = t.render).displayName || e.name || ''),
                t.displayName ||
                  ('' !== e ? 'ForwardRef(' + e + ')' : 'ForwardRef')
              );
            case 7:
              return 'Fragment';
            case 5:
              return t;
            case 4:
              return 'Portal';
            case 3:
              return 'Root';
            case 6:
              return 'Text';
            case 16:
              return H(t);
            case 8:
              return t === x ? 'StrictMode' : 'Mode';
            case 22:
              return 'Offscreen';
            case 12:
              return 'Profiler';
            case 21:
              return 'Scope';
            case 13:
              return 'Suspense';
            case 19:
              return 'SuspenseList';
            case 25:
              return 'TracingMarker';
            case 1:
            case 0:
            case 17:
            case 2:
            case 14:
            case 15:
              if ('function' === typeof t)
                return t.displayName || t.name || null;
              if ('string' === typeof t) return t;
          }
          return null;
        }
        function W(e) {
          switch (typeof e) {
            case 'boolean':
            case 'number':
            case 'string':
            case 'undefined':
            case 'object':
              return e;
            default:
              return '';
          }
        }
        function q(e) {
          var t = e.type;
          return (
            (e = e.nodeName) &&
            'input' === e.toLowerCase() &&
            ('checkbox' === t || 'radio' === t)
          );
        }
        function Q(e) {
          e._valueTracker ||
            (e._valueTracker = (function (e) {
              var t = q(e) ? 'checked' : 'value',
                n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
                r = '' + e[t];
              if (
                !e.hasOwnProperty(t) &&
                'undefined' !== typeof n &&
                'function' === typeof n.get &&
                'function' === typeof n.set
              ) {
                var a = n.get,
                  l = n.set;
                return (
                  Object.defineProperty(e, t, {
                    configurable: !0,
                    get: function () {
                      return a.call(this);
                    },
                    set: function (e) {
                      (r = '' + e), l.call(this, e);
                    },
                  }),
                  Object.defineProperty(e, t, { enumerable: n.enumerable }),
                  {
                    getValue: function () {
                      return r;
                    },
                    setValue: function (e) {
                      r = '' + e;
                    },
                    stopTracking: function () {
                      (e._valueTracker = null), delete e[t];
                    },
                  }
                );
              }
            })(e));
        }
        function J(e) {
          if (!e) return !1;
          var t = e._valueTracker;
          if (!t) return !0;
          var n = t.getValue(),
            r = '';
          return (
            e && (r = q(e) ? (e.checked ? 'true' : 'false') : e.value),
            (e = r) !== n && (t.setValue(e), !0)
          );
        }
        function K(e) {
          if (
            'undefined' ===
            typeof (e =
              e || ('undefined' !== typeof document ? document : void 0))
          )
            return null;
          try {
            return e.activeElement || e.body;
          } catch (t) {
            return e.body;
          }
        }
        function Z(e, t) {
          var n = t.checked;
          return D({}, t, {
            defaultChecked: void 0,
            defaultValue: void 0,
            value: void 0,
            checked: null != n ? n : e._wrapperState.initialChecked,
          });
        }
        function G(e, t) {
          var n = null == t.defaultValue ? '' : t.defaultValue,
            r = null != t.checked ? t.checked : t.defaultChecked;
          (n = W(null != t.value ? t.value : n)),
            (e._wrapperState = {
              initialChecked: r,
              initialValue: n,
              controlled:
                'checkbox' === t.type || 'radio' === t.type
                  ? null != t.checked
                  : null != t.value,
            });
        }
        function X(e, t) {
          null != (t = t.checked) && b(e, 'checked', t, !1);
        }
        function Y(e, t) {
          X(e, t);
          var n = W(t.value),
            r = t.type;
          if (null != n)
            'number' === r
              ? ((0 === n && '' === e.value) || e.value != n) &&
                (e.value = '' + n)
              : e.value !== '' + n && (e.value = '' + n);
          else if ('submit' === r || 'reset' === r)
            return void e.removeAttribute('value');
          t.hasOwnProperty('value')
            ? ee(e, t.type, n)
            : t.hasOwnProperty('defaultValue') &&
              ee(e, t.type, W(t.defaultValue)),
            null == t.checked &&
              null != t.defaultChecked &&
              (e.defaultChecked = !!t.defaultChecked);
        }
        function $(e, t, n) {
          if (t.hasOwnProperty('value') || t.hasOwnProperty('defaultValue')) {
            var r = t.type;
            if (
              !(
                ('submit' !== r && 'reset' !== r) ||
                (void 0 !== t.value && null !== t.value)
              )
            )
              return;
            (t = '' + e._wrapperState.initialValue),
              n || t === e.value || (e.value = t),
              (e.defaultValue = t);
          }
          '' !== (n = e.name) && (e.name = ''),
            (e.defaultChecked = !!e._wrapperState.initialChecked),
            '' !== n && (e.name = n);
        }
        function ee(e, t, n) {
          ('number' === t && K(e.ownerDocument) === e) ||
            (null == n
              ? (e.defaultValue = '' + e._wrapperState.initialValue)
              : e.defaultValue !== '' + n && (e.defaultValue = '' + n));
        }
        var te = Array.isArray;
        function ne(e, t, n, r) {
          if (((e = e.options), t)) {
            t = {};
            for (var a = 0; a < n.length; a++) t['$' + n[a]] = !0;
            for (n = 0; n < e.length; n++)
              (a = t.hasOwnProperty('$' + e[n].value)),
                e[n].selected !== a && (e[n].selected = a),
                a && r && (e[n].defaultSelected = !0);
          } else {
            for (n = '' + W(n), t = null, a = 0; a < e.length; a++) {
              if (e[a].value === n)
                return (
                  (e[a].selected = !0), void (r && (e[a].defaultSelected = !0))
                );
              null !== t || e[a].disabled || (t = e[a]);
            }
            null !== t && (t.selected = !0);
          }
        }
        function re(e, t) {
          if (null != t.dangerouslySetInnerHTML) throw Error(l(91));
          return D({}, t, {
            value: void 0,
            defaultValue: void 0,
            children: '' + e._wrapperState.initialValue,
          });
        }
        function ae(e, t) {
          var n = t.value;
          if (null == n) {
            if (((n = t.children), (t = t.defaultValue), null != n)) {
              if (null != t) throw Error(l(92));
              if (te(n)) {
                if (1 < n.length) throw Error(l(93));
                n = n[0];
              }
              t = n;
            }
            null == t && (t = ''), (n = t);
          }
          e._wrapperState = { initialValue: W(n) };
        }
        function le(e, t) {
          var n = W(t.value),
            r = W(t.defaultValue);
          null != n &&
            ((n = '' + n) !== e.value && (e.value = n),
            null == t.defaultValue &&
              e.defaultValue !== n &&
              (e.defaultValue = n)),
            null != r && (e.defaultValue = '' + r);
        }
        function oe(e) {
          var t = e.textContent;
          t === e._wrapperState.initialValue &&
            '' !== t &&
            null !== t &&
            (e.value = t);
        }
        function ie(e) {
          switch (e) {
            case 'svg':
              return 'http://www.w3.org/2000/svg';
            case 'math':
              return 'http://www.w3.org/1998/Math/MathML';
            default:
              return 'http://www.w3.org/1999/xhtml';
          }
        }
        function ue(e, t) {
          return null == e || 'http://www.w3.org/1999/xhtml' === e
            ? ie(t)
            : 'http://www.w3.org/2000/svg' === e && 'foreignObject' === t
            ? 'http://www.w3.org/1999/xhtml'
            : e;
        }
        var se,
          ce,
          de =
            ((ce = function (e, t) {
              if (
                'http://www.w3.org/2000/svg' !== e.namespaceURI ||
                'innerHTML' in e
              )
                e.innerHTML = t;
              else {
                for (
                  (se = se || document.createElement('div')).innerHTML =
                    '<svg>' + t.valueOf().toString() + '</svg>',
                    t = se.firstChild;
                  e.firstChild;

                )
                  e.removeChild(e.firstChild);
                for (; t.firstChild; ) e.appendChild(t.firstChild);
              }
            }),
            'undefined' !== typeof MSApp && MSApp.execUnsafeLocalFunction
              ? function (e, t, n, r) {
                  MSApp.execUnsafeLocalFunction(function () {
                    return ce(e, t);
                  });
                }
              : ce);
        function fe(e, t) {
          if (t) {
            var n = e.firstChild;
            if (n && n === e.lastChild && 3 === n.nodeType)
              return void (n.nodeValue = t);
          }
          e.textContent = t;
        }
        var pe = {
            animationIterationCount: !0,
            aspectRatio: !0,
            borderImageOutset: !0,
            borderImageSlice: !0,
            borderImageWidth: !0,
            boxFlex: !0,
            boxFlexGroup: !0,
            boxOrdinalGroup: !0,
            columnCount: !0,
            columns: !0,
            flex: !0,
            flexGrow: !0,
            flexPositive: !0,
            flexShrink: !0,
            flexNegative: !0,
            flexOrder: !0,
            gridArea: !0,
            gridRow: !0,
            gridRowEnd: !0,
            gridRowSpan: !0,
            gridRowStart: !0,
            gridColumn: !0,
            gridColumnEnd: !0,
            gridColumnSpan: !0,
            gridColumnStart: !0,
            fontWeight: !0,
            lineClamp: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            tabSize: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
            fillOpacity: !0,
            floodOpacity: !0,
            stopOpacity: !0,
            strokeDasharray: !0,
            strokeDashoffset: !0,
            strokeMiterlimit: !0,
            strokeOpacity: !0,
            strokeWidth: !0,
          },
          he = ['Webkit', 'ms', 'Moz', 'O'];
        function me(e, t, n) {
          return null == t || 'boolean' === typeof t || '' === t
            ? ''
            : n ||
              'number' !== typeof t ||
              0 === t ||
              (pe.hasOwnProperty(e) && pe[e])
            ? ('' + t).trim()
            : t + 'px';
        }
        function ge(e, t) {
          for (var n in ((e = e.style), t))
            if (t.hasOwnProperty(n)) {
              var r = 0 === n.indexOf('--'),
                a = me(n, t[n], r);
              'float' === n && (n = 'cssFloat'),
                r ? e.setProperty(n, a) : (e[n] = a);
            }
        }
        Object.keys(pe).forEach(function (e) {
          he.forEach(function (t) {
            (t = t + e.charAt(0).toUpperCase() + e.substring(1)),
              (pe[t] = pe[e]);
          });
        });
        var ve = D(
          { menuitem: !0 },
          {
            area: !0,
            base: !0,
            br: !0,
            col: !0,
            embed: !0,
            hr: !0,
            img: !0,
            input: !0,
            keygen: !0,
            link: !0,
            meta: !0,
            param: !0,
            source: !0,
            track: !0,
            wbr: !0,
          }
        );
        function ye(e, t) {
          if (t) {
            if (
              ve[e] &&
              (null != t.children || null != t.dangerouslySetInnerHTML)
            )
              throw Error(l(137, e));
            if (null != t.dangerouslySetInnerHTML) {
              if (null != t.children) throw Error(l(60));
              if (
                'object' !== typeof t.dangerouslySetInnerHTML ||
                !('__html' in t.dangerouslySetInnerHTML)
              )
                throw Error(l(61));
            }
            if (null != t.style && 'object' !== typeof t.style)
              throw Error(l(62));
          }
        }
        function be(e, t) {
          if (-1 === e.indexOf('-')) return 'string' === typeof t.is;
          switch (e) {
            case 'annotation-xml':
            case 'color-profile':
            case 'font-face':
            case 'font-face-src':
            case 'font-face-uri':
            case 'font-face-format':
            case 'font-face-name':
            case 'missing-glyph':
              return !1;
            default:
              return !0;
          }
        }
        var ke = null;
        function we(e) {
          return (
            (e = e.target || e.srcElement || window).correspondingUseElement &&
              (e = e.correspondingUseElement),
            3 === e.nodeType ? e.parentNode : e
          );
        }
        var Se = null,
          _e = null,
          xe = null;
        function Ee(e) {
          if ((e = ba(e))) {
            if ('function' !== typeof Se) throw Error(l(280));
            var t = e.stateNode;
            t && ((t = wa(t)), Se(e.stateNode, e.type, t));
          }
        }
        function Ce(e) {
          _e ? (xe ? xe.push(e) : (xe = [e])) : (_e = e);
        }
        function Ne() {
          if (_e) {
            var e = _e,
              t = xe;
            if (((xe = _e = null), Ee(e), t))
              for (e = 0; e < t.length; e++) Ee(t[e]);
          }
        }
        function Le(e, t) {
          return e(t);
        }
        function Te() {}
        var Pe = !1;
        function Ae(e, t, n) {
          if (Pe) return e(t, n);
          Pe = !0;
          try {
            return Le(e, t, n);
          } finally {
            (Pe = !1), (null !== _e || null !== xe) && (Te(), Ne());
          }
        }
        function ze(e, t) {
          var n = e.stateNode;
          if (null === n) return null;
          var r = wa(n);
          if (null === r) return null;
          n = r[t];
          e: switch (t) {
            case 'onClick':
            case 'onClickCapture':
            case 'onDoubleClick':
            case 'onDoubleClickCapture':
            case 'onMouseDown':
            case 'onMouseDownCapture':
            case 'onMouseMove':
            case 'onMouseMoveCapture':
            case 'onMouseUp':
            case 'onMouseUpCapture':
            case 'onMouseEnter':
              (r = !r.disabled) ||
                (r = !(
                  'button' === (e = e.type) ||
                  'input' === e ||
                  'select' === e ||
                  'textarea' === e
                )),
                (e = !r);
              break e;
            default:
              e = !1;
          }
          if (e) return null;
          if (n && 'function' !== typeof n) throw Error(l(231, t, typeof n));
          return n;
        }
        var je = !1;
        if (c)
          try {
            var Oe = {};
            Object.defineProperty(Oe, 'passive', {
              get: function () {
                je = !0;
              },
            }),
              window.addEventListener('test', Oe, Oe),
              window.removeEventListener('test', Oe, Oe);
          } catch (ce) {
            je = !1;
          }
        function Re(e, t, n, r, a, l, o, i, u) {
          var s = Array.prototype.slice.call(arguments, 3);
          try {
            t.apply(n, s);
          } catch (c) {
            this.onError(c);
          }
        }
        var Me = !1,
          De = null,
          Fe = !1,
          Ie = null,
          Be = {
            onError: function (e) {
              (Me = !0), (De = e);
            },
          };
        function Ve(e, t, n, r, a, l, o, i, u) {
          (Me = !1), (De = null), Re.apply(Be, arguments);
        }
        function He(e) {
          var t = e,
            n = e;
          if (e.alternate) for (; t.return; ) t = t.return;
          else {
            e = t;
            do {
              0 !== (4098 & (t = e).flags) && (n = t.return), (e = t.return);
            } while (e);
          }
          return 3 === t.tag ? n : null;
        }
        function Ue(e) {
          if (13 === e.tag) {
            var t = e.memoizedState;
            if (
              (null === t &&
                null !== (e = e.alternate) &&
                (t = e.memoizedState),
              null !== t)
            )
              return t.dehydrated;
          }
          return null;
        }
        function We(e) {
          if (He(e) !== e) throw Error(l(188));
        }
        function qe(e) {
          return null !==
            (e = (function (e) {
              var t = e.alternate;
              if (!t) {
                if (null === (t = He(e))) throw Error(l(188));
                return t !== e ? null : e;
              }
              for (var n = e, r = t; ; ) {
                var a = n.return;
                if (null === a) break;
                var o = a.alternate;
                if (null === o) {
                  if (null !== (r = a.return)) {
                    n = r;
                    continue;
                  }
                  break;
                }
                if (a.child === o.child) {
                  for (o = a.child; o; ) {
                    if (o === n) return We(a), e;
                    if (o === r) return We(a), t;
                    o = o.sibling;
                  }
                  throw Error(l(188));
                }
                if (n.return !== r.return) (n = a), (r = o);
                else {
                  for (var i = !1, u = a.child; u; ) {
                    if (u === n) {
                      (i = !0), (n = a), (r = o);
                      break;
                    }
                    if (u === r) {
                      (i = !0), (r = a), (n = o);
                      break;
                    }
                    u = u.sibling;
                  }
                  if (!i) {
                    for (u = o.child; u; ) {
                      if (u === n) {
                        (i = !0), (n = o), (r = a);
                        break;
                      }
                      if (u === r) {
                        (i = !0), (r = o), (n = a);
                        break;
                      }
                      u = u.sibling;
                    }
                    if (!i) throw Error(l(189));
                  }
                }
                if (n.alternate !== r) throw Error(l(190));
              }
              if (3 !== n.tag) throw Error(l(188));
              return n.stateNode.current === n ? e : t;
            })(e))
            ? Qe(e)
            : null;
        }
        function Qe(e) {
          if (5 === e.tag || 6 === e.tag) return e;
          for (e = e.child; null !== e; ) {
            var t = Qe(e);
            if (null !== t) return t;
            e = e.sibling;
          }
          return null;
        }
        var Je = a.unstable_scheduleCallback,
          Ke = a.unstable_cancelCallback,
          Ze = a.unstable_shouldYield,
          Ge = a.unstable_requestPaint,
          Xe = a.unstable_now,
          Ye = a.unstable_getCurrentPriorityLevel,
          $e = a.unstable_ImmediatePriority,
          et = a.unstable_UserBlockingPriority,
          tt = a.unstable_NormalPriority,
          nt = a.unstable_LowPriority,
          rt = a.unstable_IdlePriority,
          at = null,
          lt = null;
        var ot = Math.clz32
            ? Math.clz32
            : function (e) {
                return (e >>>= 0), 0 === e ? 32 : (31 - ((it(e) / ut) | 0)) | 0;
              },
          it = Math.log,
          ut = Math.LN2;
        var st = 64,
          ct = 4194304;
        function dt(e) {
          switch (e & -e) {
            case 1:
              return 1;
            case 2:
              return 2;
            case 4:
              return 4;
            case 8:
              return 8;
            case 16:
              return 16;
            case 32:
              return 32;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return 4194240 & e;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              return 130023424 & e;
            case 134217728:
              return 134217728;
            case 268435456:
              return 268435456;
            case 536870912:
              return 536870912;
            case 1073741824:
              return 1073741824;
            default:
              return e;
          }
        }
        function ft(e, t) {
          var n = e.pendingLanes;
          if (0 === n) return 0;
          var r = 0,
            a = e.suspendedLanes,
            l = e.pingedLanes,
            o = 268435455 & n;
          if (0 !== o) {
            var i = o & ~a;
            0 !== i ? (r = dt(i)) : 0 !== (l &= o) && (r = dt(l));
          } else 0 !== (o = n & ~a) ? (r = dt(o)) : 0 !== l && (r = dt(l));
          if (0 === r) return 0;
          if (
            0 !== t &&
            t !== r &&
            0 === (t & a) &&
            ((a = r & -r) >= (l = t & -t) || (16 === a && 0 !== (4194240 & l)))
          )
            return t;
          if ((0 !== (4 & r) && (r |= 16 & n), 0 !== (t = e.entangledLanes)))
            for (e = e.entanglements, t &= r; 0 < t; )
              (a = 1 << (n = 31 - ot(t))), (r |= e[n]), (t &= ~a);
          return r;
        }
        function pt(e, t) {
          switch (e) {
            case 1:
            case 2:
            case 4:
              return t + 250;
            case 8:
            case 16:
            case 32:
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
              return t + 5e3;
            default:
              return -1;
          }
        }
        function ht(e) {
          return 0 !== (e = -1073741825 & e.pendingLanes)
            ? e
            : 1073741824 & e
            ? 1073741824
            : 0;
        }
        function mt() {
          var e = st;
          return 0 === (4194240 & (st <<= 1)) && (st = 64), e;
        }
        function gt(e) {
          for (var t = [], n = 0; 31 > n; n++) t.push(e);
          return t;
        }
        function vt(e, t, n) {
          (e.pendingLanes |= t),
            536870912 !== t && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
            ((e = e.eventTimes)[(t = 31 - ot(t))] = n);
        }
        function yt(e, t) {
          var n = (e.entangledLanes |= t);
          for (e = e.entanglements; n; ) {
            var r = 31 - ot(n),
              a = 1 << r;
            (a & t) | (e[r] & t) && (e[r] |= t), (n &= ~a);
          }
        }
        var bt = 0;
        function kt(e) {
          return 1 < (e &= -e)
            ? 4 < e
              ? 0 !== (268435455 & e)
                ? 16
                : 536870912
              : 4
            : 1;
        }
        var wt,
          St,
          _t,
          xt,
          Et,
          Ct = !1,
          Nt = [],
          Lt = null,
          Tt = null,
          Pt = null,
          At = new Map(),
          zt = new Map(),
          jt = [],
          Ot =
            'mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit'.split(
              ' '
            );
        function Rt(e, t) {
          switch (e) {
            case 'focusin':
            case 'focusout':
              Lt = null;
              break;
            case 'dragenter':
            case 'dragleave':
              Tt = null;
              break;
            case 'mouseover':
            case 'mouseout':
              Pt = null;
              break;
            case 'pointerover':
            case 'pointerout':
              At.delete(t.pointerId);
              break;
            case 'gotpointercapture':
            case 'lostpointercapture':
              zt.delete(t.pointerId);
          }
        }
        function Mt(e, t, n, r, a, l) {
          return null === e || e.nativeEvent !== l
            ? ((e = {
                blockedOn: t,
                domEventName: n,
                eventSystemFlags: r,
                nativeEvent: l,
                targetContainers: [a],
              }),
              null !== t && null !== (t = ba(t)) && St(t),
              e)
            : ((e.eventSystemFlags |= r),
              (t = e.targetContainers),
              null !== a && -1 === t.indexOf(a) && t.push(a),
              e);
        }
        function Dt(e) {
          var t = ya(e.target);
          if (null !== t) {
            var n = He(t);
            if (null !== n)
              if (13 === (t = n.tag)) {
                if (null !== (t = Ue(n)))
                  return (
                    (e.blockedOn = t),
                    void Et(e.priority, function () {
                      _t(n);
                    })
                  );
              } else if (
                3 === t &&
                n.stateNode.current.memoizedState.isDehydrated
              )
                return void (e.blockedOn =
                  3 === n.tag ? n.stateNode.containerInfo : null);
          }
          e.blockedOn = null;
        }
        function Ft(e) {
          if (null !== e.blockedOn) return !1;
          for (var t = e.targetContainers; 0 < t.length; ) {
            var n = Zt(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
            if (null !== n)
              return null !== (t = ba(n)) && St(t), (e.blockedOn = n), !1;
            var r = new (n = e.nativeEvent).constructor(n.type, n);
            (ke = r), n.target.dispatchEvent(r), (ke = null), t.shift();
          }
          return !0;
        }
        function It(e, t, n) {
          Ft(e) && n.delete(t);
        }
        function Bt() {
          (Ct = !1),
            null !== Lt && Ft(Lt) && (Lt = null),
            null !== Tt && Ft(Tt) && (Tt = null),
            null !== Pt && Ft(Pt) && (Pt = null),
            At.forEach(It),
            zt.forEach(It);
        }
        function Vt(e, t) {
          e.blockedOn === t &&
            ((e.blockedOn = null),
            Ct ||
              ((Ct = !0),
              a.unstable_scheduleCallback(a.unstable_NormalPriority, Bt)));
        }
        function Ht(e) {
          function t(t) {
            return Vt(t, e);
          }
          if (0 < Nt.length) {
            Vt(Nt[0], e);
            for (var n = 1; n < Nt.length; n++) {
              var r = Nt[n];
              r.blockedOn === e && (r.blockedOn = null);
            }
          }
          for (
            null !== Lt && Vt(Lt, e),
              null !== Tt && Vt(Tt, e),
              null !== Pt && Vt(Pt, e),
              At.forEach(t),
              zt.forEach(t),
              n = 0;
            n < jt.length;
            n++
          )
            (r = jt[n]).blockedOn === e && (r.blockedOn = null);
          for (; 0 < jt.length && null === (n = jt[0]).blockedOn; )
            Dt(n), null === n.blockedOn && jt.shift();
        }
        var Ut = k.ReactCurrentBatchConfig,
          Wt = !0;
        function qt(e, t, n, r) {
          var a = bt,
            l = Ut.transition;
          Ut.transition = null;
          try {
            (bt = 1), Jt(e, t, n, r);
          } finally {
            (bt = a), (Ut.transition = l);
          }
        }
        function Qt(e, t, n, r) {
          var a = bt,
            l = Ut.transition;
          Ut.transition = null;
          try {
            (bt = 4), Jt(e, t, n, r);
          } finally {
            (bt = a), (Ut.transition = l);
          }
        }
        function Jt(e, t, n, r) {
          if (Wt) {
            var a = Zt(e, t, n, r);
            if (null === a) Wr(e, t, r, Kt, n), Rt(e, r);
            else if (
              (function (e, t, n, r, a) {
                switch (t) {
                  case 'focusin':
                    return (Lt = Mt(Lt, e, t, n, r, a)), !0;
                  case 'dragenter':
                    return (Tt = Mt(Tt, e, t, n, r, a)), !0;
                  case 'mouseover':
                    return (Pt = Mt(Pt, e, t, n, r, a)), !0;
                  case 'pointerover':
                    var l = a.pointerId;
                    return At.set(l, Mt(At.get(l) || null, e, t, n, r, a)), !0;
                  case 'gotpointercapture':
                    return (
                      (l = a.pointerId),
                      zt.set(l, Mt(zt.get(l) || null, e, t, n, r, a)),
                      !0
                    );
                }
                return !1;
              })(a, e, t, n, r)
            )
              r.stopPropagation();
            else if ((Rt(e, r), 4 & t && -1 < Ot.indexOf(e))) {
              for (; null !== a; ) {
                var l = ba(a);
                if (
                  (null !== l && wt(l),
                  null === (l = Zt(e, t, n, r)) && Wr(e, t, r, Kt, n),
                  l === a)
                )
                  break;
                a = l;
              }
              null !== a && r.stopPropagation();
            } else Wr(e, t, r, null, n);
          }
        }
        var Kt = null;
        function Zt(e, t, n, r) {
          if (((Kt = null), null !== (e = ya((e = we(r))))))
            if (null === (t = He(e))) e = null;
            else if (13 === (n = t.tag)) {
              if (null !== (e = Ue(t))) return e;
              e = null;
            } else if (3 === n) {
              if (t.stateNode.current.memoizedState.isDehydrated)
                return 3 === t.tag ? t.stateNode.containerInfo : null;
              e = null;
            } else t !== e && (e = null);
          return (Kt = e), null;
        }
        function Gt(e) {
          switch (e) {
            case 'cancel':
            case 'click':
            case 'close':
            case 'contextmenu':
            case 'copy':
            case 'cut':
            case 'auxclick':
            case 'dblclick':
            case 'dragend':
            case 'dragstart':
            case 'drop':
            case 'focusin':
            case 'focusout':
            case 'input':
            case 'invalid':
            case 'keydown':
            case 'keypress':
            case 'keyup':
            case 'mousedown':
            case 'mouseup':
            case 'paste':
            case 'pause':
            case 'play':
            case 'pointercancel':
            case 'pointerdown':
            case 'pointerup':
            case 'ratechange':
            case 'reset':
            case 'resize':
            case 'seeked':
            case 'submit':
            case 'touchcancel':
            case 'touchend':
            case 'touchstart':
            case 'volumechange':
            case 'change':
            case 'selectionchange':
            case 'textInput':
            case 'compositionstart':
            case 'compositionend':
            case 'compositionupdate':
            case 'beforeblur':
            case 'afterblur':
            case 'beforeinput':
            case 'blur':
            case 'fullscreenchange':
            case 'focus':
            case 'hashchange':
            case 'popstate':
            case 'select':
            case 'selectstart':
              return 1;
            case 'drag':
            case 'dragenter':
            case 'dragexit':
            case 'dragleave':
            case 'dragover':
            case 'mousemove':
            case 'mouseout':
            case 'mouseover':
            case 'pointermove':
            case 'pointerout':
            case 'pointerover':
            case 'scroll':
            case 'toggle':
            case 'touchmove':
            case 'wheel':
            case 'mouseenter':
            case 'mouseleave':
            case 'pointerenter':
            case 'pointerleave':
              return 4;
            case 'message':
              switch (Ye()) {
                case $e:
                  return 1;
                case et:
                  return 4;
                case tt:
                case nt:
                  return 16;
                case rt:
                  return 536870912;
                default:
                  return 16;
              }
            default:
              return 16;
          }
        }
        var Xt = null,
          Yt = null,
          $t = null;
        function en() {
          if ($t) return $t;
          var e,
            t,
            n = Yt,
            r = n.length,
            a = 'value' in Xt ? Xt.value : Xt.textContent,
            l = a.length;
          for (e = 0; e < r && n[e] === a[e]; e++);
          var o = r - e;
          for (t = 1; t <= o && n[r - t] === a[l - t]; t++);
          return ($t = a.slice(e, 1 < t ? 1 - t : void 0));
        }
        function tn(e) {
          var t = e.keyCode;
          return (
            'charCode' in e
              ? 0 === (e = e.charCode) && 13 === t && (e = 13)
              : (e = t),
            10 === e && (e = 13),
            32 <= e || 13 === e ? e : 0
          );
        }
        function nn() {
          return !0;
        }
        function rn() {
          return !1;
        }
        function an(e) {
          function t(t, n, r, a, l) {
            for (var o in ((this._reactName = t),
            (this._targetInst = r),
            (this.type = n),
            (this.nativeEvent = a),
            (this.target = l),
            (this.currentTarget = null),
            e))
              e.hasOwnProperty(o) && ((t = e[o]), (this[o] = t ? t(a) : a[o]));
            return (
              (this.isDefaultPrevented = (
                null != a.defaultPrevented
                  ? a.defaultPrevented
                  : !1 === a.returnValue
              )
                ? nn
                : rn),
              (this.isPropagationStopped = rn),
              this
            );
          }
          return (
            D(t.prototype, {
              preventDefault: function () {
                this.defaultPrevented = !0;
                var e = this.nativeEvent;
                e &&
                  (e.preventDefault
                    ? e.preventDefault()
                    : 'unknown' !== typeof e.returnValue &&
                      (e.returnValue = !1),
                  (this.isDefaultPrevented = nn));
              },
              stopPropagation: function () {
                var e = this.nativeEvent;
                e &&
                  (e.stopPropagation
                    ? e.stopPropagation()
                    : 'unknown' !== typeof e.cancelBubble &&
                      (e.cancelBubble = !0),
                  (this.isPropagationStopped = nn));
              },
              persist: function () {},
              isPersistent: nn,
            }),
            t
          );
        }
        var ln,
          on,
          un,
          sn = {
            eventPhase: 0,
            bubbles: 0,
            cancelable: 0,
            timeStamp: function (e) {
              return e.timeStamp || Date.now();
            },
            defaultPrevented: 0,
            isTrusted: 0,
          },
          cn = an(sn),
          dn = D({}, sn, { view: 0, detail: 0 }),
          fn = an(dn),
          pn = D({}, dn, {
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            getModifierState: En,
            button: 0,
            buttons: 0,
            relatedTarget: function (e) {
              return void 0 === e.relatedTarget
                ? e.fromElement === e.srcElement
                  ? e.toElement
                  : e.fromElement
                : e.relatedTarget;
            },
            movementX: function (e) {
              return 'movementX' in e
                ? e.movementX
                : (e !== un &&
                    (un && 'mousemove' === e.type
                      ? ((ln = e.screenX - un.screenX),
                        (on = e.screenY - un.screenY))
                      : (on = ln = 0),
                    (un = e)),
                  ln);
            },
            movementY: function (e) {
              return 'movementY' in e ? e.movementY : on;
            },
          }),
          hn = an(pn),
          mn = an(D({}, pn, { dataTransfer: 0 })),
          gn = an(D({}, dn, { relatedTarget: 0 })),
          vn = an(
            D({}, sn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 })
          ),
          yn = D({}, sn, {
            clipboardData: function (e) {
              return 'clipboardData' in e
                ? e.clipboardData
                : window.clipboardData;
            },
          }),
          bn = an(yn),
          kn = an(D({}, sn, { data: 0 })),
          wn = {
            Esc: 'Escape',
            Spacebar: ' ',
            Left: 'ArrowLeft',
            Up: 'ArrowUp',
            Right: 'ArrowRight',
            Down: 'ArrowDown',
            Del: 'Delete',
            Win: 'OS',
            Menu: 'ContextMenu',
            Apps: 'ContextMenu',
            Scroll: 'ScrollLock',
            MozPrintableKey: 'Unidentified',
          },
          Sn = {
            8: 'Backspace',
            9: 'Tab',
            12: 'Clear',
            13: 'Enter',
            16: 'Shift',
            17: 'Control',
            18: 'Alt',
            19: 'Pause',
            20: 'CapsLock',
            27: 'Escape',
            32: ' ',
            33: 'PageUp',
            34: 'PageDown',
            35: 'End',
            36: 'Home',
            37: 'ArrowLeft',
            38: 'ArrowUp',
            39: 'ArrowRight',
            40: 'ArrowDown',
            45: 'Insert',
            46: 'Delete',
            112: 'F1',
            113: 'F2',
            114: 'F3',
            115: 'F4',
            116: 'F5',
            117: 'F6',
            118: 'F7',
            119: 'F8',
            120: 'F9',
            121: 'F10',
            122: 'F11',
            123: 'F12',
            144: 'NumLock',
            145: 'ScrollLock',
            224: 'Meta',
          },
          _n = {
            Alt: 'altKey',
            Control: 'ctrlKey',
            Meta: 'metaKey',
            Shift: 'shiftKey',
          };
        function xn(e) {
          var t = this.nativeEvent;
          return t.getModifierState
            ? t.getModifierState(e)
            : !!(e = _n[e]) && !!t[e];
        }
        function En() {
          return xn;
        }
        var Cn = D({}, dn, {
            key: function (e) {
              if (e.key) {
                var t = wn[e.key] || e.key;
                if ('Unidentified' !== t) return t;
              }
              return 'keypress' === e.type
                ? 13 === (e = tn(e))
                  ? 'Enter'
                  : String.fromCharCode(e)
                : 'keydown' === e.type || 'keyup' === e.type
                ? Sn[e.keyCode] || 'Unidentified'
                : '';
            },
            code: 0,
            location: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            repeat: 0,
            locale: 0,
            getModifierState: En,
            charCode: function (e) {
              return 'keypress' === e.type ? tn(e) : 0;
            },
            keyCode: function (e) {
              return 'keydown' === e.type || 'keyup' === e.type ? e.keyCode : 0;
            },
            which: function (e) {
              return 'keypress' === e.type
                ? tn(e)
                : 'keydown' === e.type || 'keyup' === e.type
                ? e.keyCode
                : 0;
            },
          }),
          Nn = an(Cn),
          Ln = an(
            D({}, pn, {
              pointerId: 0,
              width: 0,
              height: 0,
              pressure: 0,
              tangentialPressure: 0,
              tiltX: 0,
              tiltY: 0,
              twist: 0,
              pointerType: 0,
              isPrimary: 0,
            })
          ),
          Tn = an(
            D({}, dn, {
              touches: 0,
              targetTouches: 0,
              changedTouches: 0,
              altKey: 0,
              metaKey: 0,
              ctrlKey: 0,
              shiftKey: 0,
              getModifierState: En,
            })
          ),
          Pn = an(
            D({}, sn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 })
          ),
          An = D({}, pn, {
            deltaX: function (e) {
              return 'deltaX' in e
                ? e.deltaX
                : 'wheelDeltaX' in e
                ? -e.wheelDeltaX
                : 0;
            },
            deltaY: function (e) {
              return 'deltaY' in e
                ? e.deltaY
                : 'wheelDeltaY' in e
                ? -e.wheelDeltaY
                : 'wheelDelta' in e
                ? -e.wheelDelta
                : 0;
            },
            deltaZ: 0,
            deltaMode: 0,
          }),
          zn = an(An),
          jn = [9, 13, 27, 32],
          On = c && 'CompositionEvent' in window,
          Rn = null;
        c && 'documentMode' in document && (Rn = document.documentMode);
        var Mn = c && 'TextEvent' in window && !Rn,
          Dn = c && (!On || (Rn && 8 < Rn && 11 >= Rn)),
          Fn = String.fromCharCode(32),
          In = !1;
        function Bn(e, t) {
          switch (e) {
            case 'keyup':
              return -1 !== jn.indexOf(t.keyCode);
            case 'keydown':
              return 229 !== t.keyCode;
            case 'keypress':
            case 'mousedown':
            case 'focusout':
              return !0;
            default:
              return !1;
          }
        }
        function Vn(e) {
          return 'object' === typeof (e = e.detail) && 'data' in e
            ? e.data
            : null;
        }
        var Hn = !1;
        var Un = {
          color: !0,
          date: !0,
          datetime: !0,
          'datetime-local': !0,
          email: !0,
          month: !0,
          number: !0,
          password: !0,
          range: !0,
          search: !0,
          tel: !0,
          text: !0,
          time: !0,
          url: !0,
          week: !0,
        };
        function Wn(e) {
          var t = e && e.nodeName && e.nodeName.toLowerCase();
          return 'input' === t ? !!Un[e.type] : 'textarea' === t;
        }
        function qn(e, t, n, r) {
          Ce(r),
            0 < (t = Qr(t, 'onChange')).length &&
              ((n = new cn('onChange', 'change', null, n, r)),
              e.push({ event: n, listeners: t }));
        }
        var Qn = null,
          Jn = null;
        function Kn(e) {
          Fr(e, 0);
        }
        function Zn(e) {
          if (J(ka(e))) return e;
        }
        function Gn(e, t) {
          if ('change' === e) return t;
        }
        var Xn = !1;
        if (c) {
          var Yn;
          if (c) {
            var $n = 'oninput' in document;
            if (!$n) {
              var er = document.createElement('div');
              er.setAttribute('oninput', 'return;'),
                ($n = 'function' === typeof er.oninput);
            }
            Yn = $n;
          } else Yn = !1;
          Xn = Yn && (!document.documentMode || 9 < document.documentMode);
        }
        function tr() {
          Qn && (Qn.detachEvent('onpropertychange', nr), (Jn = Qn = null));
        }
        function nr(e) {
          if ('value' === e.propertyName && Zn(Jn)) {
            var t = [];
            qn(t, Jn, e, we(e)), Ae(Kn, t);
          }
        }
        function rr(e, t, n) {
          'focusin' === e
            ? (tr(), (Jn = n), (Qn = t).attachEvent('onpropertychange', nr))
            : 'focusout' === e && tr();
        }
        function ar(e) {
          if ('selectionchange' === e || 'keyup' === e || 'keydown' === e)
            return Zn(Jn);
        }
        function lr(e, t) {
          if ('click' === e) return Zn(t);
        }
        function or(e, t) {
          if ('input' === e || 'change' === e) return Zn(t);
        }
        var ir =
          'function' === typeof Object.is
            ? Object.is
            : function (e, t) {
                return (
                  (e === t && (0 !== e || 1 / e === 1 / t)) ||
                  (e !== e && t !== t)
                );
              };
        function ur(e, t) {
          if (ir(e, t)) return !0;
          if (
            'object' !== typeof e ||
            null === e ||
            'object' !== typeof t ||
            null === t
          )
            return !1;
          var n = Object.keys(e),
            r = Object.keys(t);
          if (n.length !== r.length) return !1;
          for (r = 0; r < n.length; r++) {
            var a = n[r];
            if (!d.call(t, a) || !ir(e[a], t[a])) return !1;
          }
          return !0;
        }
        function sr(e) {
          for (; e && e.firstChild; ) e = e.firstChild;
          return e;
        }
        function cr(e, t) {
          var n,
            r = sr(e);
          for (e = 0; r; ) {
            if (3 === r.nodeType) {
              if (((n = e + r.textContent.length), e <= t && n >= t))
                return { node: r, offset: t - e };
              e = n;
            }
            e: {
              for (; r; ) {
                if (r.nextSibling) {
                  r = r.nextSibling;
                  break e;
                }
                r = r.parentNode;
              }
              r = void 0;
            }
            r = sr(r);
          }
        }
        function dr(e, t) {
          return (
            !(!e || !t) &&
            (e === t ||
              ((!e || 3 !== e.nodeType) &&
                (t && 3 === t.nodeType
                  ? dr(e, t.parentNode)
                  : 'contains' in e
                  ? e.contains(t)
                  : !!e.compareDocumentPosition &&
                    !!(16 & e.compareDocumentPosition(t)))))
          );
        }
        function fr() {
          for (var e = window, t = K(); t instanceof e.HTMLIFrameElement; ) {
            try {
              var n = 'string' === typeof t.contentWindow.location.href;
            } catch (r) {
              n = !1;
            }
            if (!n) break;
            t = K((e = t.contentWindow).document);
          }
          return t;
        }
        function pr(e) {
          var t = e && e.nodeName && e.nodeName.toLowerCase();
          return (
            t &&
            (('input' === t &&
              ('text' === e.type ||
                'search' === e.type ||
                'tel' === e.type ||
                'url' === e.type ||
                'password' === e.type)) ||
              'textarea' === t ||
              'true' === e.contentEditable)
          );
        }
        function hr(e) {
          var t = fr(),
            n = e.focusedElem,
            r = e.selectionRange;
          if (
            t !== n &&
            n &&
            n.ownerDocument &&
            dr(n.ownerDocument.documentElement, n)
          ) {
            if (null !== r && pr(n))
              if (
                ((t = r.start),
                void 0 === (e = r.end) && (e = t),
                'selectionStart' in n)
              )
                (n.selectionStart = t),
                  (n.selectionEnd = Math.min(e, n.value.length));
              else if (
                (e =
                  ((t = n.ownerDocument || document) && t.defaultView) ||
                  window).getSelection
              ) {
                e = e.getSelection();
                var a = n.textContent.length,
                  l = Math.min(r.start, a);
                (r = void 0 === r.end ? l : Math.min(r.end, a)),
                  !e.extend && l > r && ((a = r), (r = l), (l = a)),
                  (a = cr(n, l));
                var o = cr(n, r);
                a &&
                  o &&
                  (1 !== e.rangeCount ||
                    e.anchorNode !== a.node ||
                    e.anchorOffset !== a.offset ||
                    e.focusNode !== o.node ||
                    e.focusOffset !== o.offset) &&
                  ((t = t.createRange()).setStart(a.node, a.offset),
                  e.removeAllRanges(),
                  l > r
                    ? (e.addRange(t), e.extend(o.node, o.offset))
                    : (t.setEnd(o.node, o.offset), e.addRange(t)));
              }
            for (t = [], e = n; (e = e.parentNode); )
              1 === e.nodeType &&
                t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
            for (
              'function' === typeof n.focus && n.focus(), n = 0;
              n < t.length;
              n++
            )
              ((e = t[n]).element.scrollLeft = e.left),
                (e.element.scrollTop = e.top);
          }
        }
        var mr = c && 'documentMode' in document && 11 >= document.documentMode,
          gr = null,
          vr = null,
          yr = null,
          br = !1;
        function kr(e, t, n) {
          var r =
            n.window === n
              ? n.document
              : 9 === n.nodeType
              ? n
              : n.ownerDocument;
          br ||
            null == gr ||
            gr !== K(r) ||
            ('selectionStart' in (r = gr) && pr(r)
              ? (r = { start: r.selectionStart, end: r.selectionEnd })
              : (r = {
                  anchorNode: (r = (
                    (r.ownerDocument && r.ownerDocument.defaultView) ||
                    window
                  ).getSelection()).anchorNode,
                  anchorOffset: r.anchorOffset,
                  focusNode: r.focusNode,
                  focusOffset: r.focusOffset,
                }),
            (yr && ur(yr, r)) ||
              ((yr = r),
              0 < (r = Qr(vr, 'onSelect')).length &&
                ((t = new cn('onSelect', 'select', null, t, n)),
                e.push({ event: t, listeners: r }),
                (t.target = gr))));
        }
        function wr(e, t) {
          var n = {};
          return (
            (n[e.toLowerCase()] = t.toLowerCase()),
            (n['Webkit' + e] = 'webkit' + t),
            (n['Moz' + e] = 'moz' + t),
            n
          );
        }
        var Sr = {
            animationend: wr('Animation', 'AnimationEnd'),
            animationiteration: wr('Animation', 'AnimationIteration'),
            animationstart: wr('Animation', 'AnimationStart'),
            transitionend: wr('Transition', 'TransitionEnd'),
          },
          _r = {},
          xr = {};
        function Er(e) {
          if (_r[e]) return _r[e];
          if (!Sr[e]) return e;
          var t,
            n = Sr[e];
          for (t in n)
            if (n.hasOwnProperty(t) && t in xr) return (_r[e] = n[t]);
          return e;
        }
        c &&
          ((xr = document.createElement('div').style),
          'AnimationEvent' in window ||
            (delete Sr.animationend.animation,
            delete Sr.animationiteration.animation,
            delete Sr.animationstart.animation),
          'TransitionEvent' in window || delete Sr.transitionend.transition);
        var Cr = Er('animationend'),
          Nr = Er('animationiteration'),
          Lr = Er('animationstart'),
          Tr = Er('transitionend'),
          Pr = new Map(),
          Ar =
            'abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel'.split(
              ' '
            );
        function zr(e, t) {
          Pr.set(e, t), u(t, [e]);
        }
        for (var jr = 0; jr < Ar.length; jr++) {
          var Or = Ar[jr];
          zr(Or.toLowerCase(), 'on' + (Or[0].toUpperCase() + Or.slice(1)));
        }
        zr(Cr, 'onAnimationEnd'),
          zr(Nr, 'onAnimationIteration'),
          zr(Lr, 'onAnimationStart'),
          zr('dblclick', 'onDoubleClick'),
          zr('focusin', 'onFocus'),
          zr('focusout', 'onBlur'),
          zr(Tr, 'onTransitionEnd'),
          s('onMouseEnter', ['mouseout', 'mouseover']),
          s('onMouseLeave', ['mouseout', 'mouseover']),
          s('onPointerEnter', ['pointerout', 'pointerover']),
          s('onPointerLeave', ['pointerout', 'pointerover']),
          u(
            'onChange',
            'change click focusin focusout input keydown keyup selectionchange'.split(
              ' '
            )
          ),
          u(
            'onSelect',
            'focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange'.split(
              ' '
            )
          ),
          u('onBeforeInput', [
            'compositionend',
            'keypress',
            'textInput',
            'paste',
          ]),
          u(
            'onCompositionEnd',
            'compositionend focusout keydown keypress keyup mousedown'.split(
              ' '
            )
          ),
          u(
            'onCompositionStart',
            'compositionstart focusout keydown keypress keyup mousedown'.split(
              ' '
            )
          ),
          u(
            'onCompositionUpdate',
            'compositionupdate focusout keydown keypress keyup mousedown'.split(
              ' '
            )
          );
        var Rr =
            'abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting'.split(
              ' '
            ),
          Mr = new Set(
            'cancel close invalid load scroll toggle'.split(' ').concat(Rr)
          );
        function Dr(e, t, n) {
          var r = e.type || 'unknown-event';
          (e.currentTarget = n),
            (function (e, t, n, r, a, o, i, u, s) {
              if ((Ve.apply(this, arguments), Me)) {
                if (!Me) throw Error(l(198));
                var c = De;
                (Me = !1), (De = null), Fe || ((Fe = !0), (Ie = c));
              }
            })(r, t, void 0, e),
            (e.currentTarget = null);
        }
        function Fr(e, t) {
          t = 0 !== (4 & t);
          for (var n = 0; n < e.length; n++) {
            var r = e[n],
              a = r.event;
            r = r.listeners;
            e: {
              var l = void 0;
              if (t)
                for (var o = r.length - 1; 0 <= o; o--) {
                  var i = r[o],
                    u = i.instance,
                    s = i.currentTarget;
                  if (((i = i.listener), u !== l && a.isPropagationStopped()))
                    break e;
                  Dr(a, i, s), (l = u);
                }
              else
                for (o = 0; o < r.length; o++) {
                  if (
                    ((u = (i = r[o]).instance),
                    (s = i.currentTarget),
                    (i = i.listener),
                    u !== l && a.isPropagationStopped())
                  )
                    break e;
                  Dr(a, i, s), (l = u);
                }
            }
          }
          if (Fe) throw ((e = Ie), (Fe = !1), (Ie = null), e);
        }
        function Ir(e, t) {
          var n = t[ma];
          void 0 === n && (n = t[ma] = new Set());
          var r = e + '__bubble';
          n.has(r) || (Ur(t, e, 2, !1), n.add(r));
        }
        function Br(e, t, n) {
          var r = 0;
          t && (r |= 4), Ur(n, e, r, t);
        }
        var Vr = '_reactListening' + Math.random().toString(36).slice(2);
        function Hr(e) {
          if (!e[Vr]) {
            (e[Vr] = !0),
              o.forEach(function (t) {
                'selectionchange' !== t &&
                  (Mr.has(t) || Br(t, !1, e), Br(t, !0, e));
              });
            var t = 9 === e.nodeType ? e : e.ownerDocument;
            null === t || t[Vr] || ((t[Vr] = !0), Br('selectionchange', !1, t));
          }
        }
        function Ur(e, t, n, r) {
          switch (Gt(t)) {
            case 1:
              var a = qt;
              break;
            case 4:
              a = Qt;
              break;
            default:
              a = Jt;
          }
          (n = a.bind(null, t, n, e)),
            (a = void 0),
            !je ||
              ('touchstart' !== t && 'touchmove' !== t && 'wheel' !== t) ||
              (a = !0),
            r
              ? void 0 !== a
                ? e.addEventListener(t, n, { capture: !0, passive: a })
                : e.addEventListener(t, n, !0)
              : void 0 !== a
              ? e.addEventListener(t, n, { passive: a })
              : e.addEventListener(t, n, !1);
        }
        function Wr(e, t, n, r, a) {
          var l = r;
          if (0 === (1 & t) && 0 === (2 & t) && null !== r)
            e: for (;;) {
              if (null === r) return;
              var o = r.tag;
              if (3 === o || 4 === o) {
                var i = r.stateNode.containerInfo;
                if (i === a || (8 === i.nodeType && i.parentNode === a)) break;
                if (4 === o)
                  for (o = r.return; null !== o; ) {
                    var u = o.tag;
                    if (
                      (3 === u || 4 === u) &&
                      ((u = o.stateNode.containerInfo) === a ||
                        (8 === u.nodeType && u.parentNode === a))
                    )
                      return;
                    o = o.return;
                  }
                for (; null !== i; ) {
                  if (null === (o = ya(i))) return;
                  if (5 === (u = o.tag) || 6 === u) {
                    r = l = o;
                    continue e;
                  }
                  i = i.parentNode;
                }
              }
              r = r.return;
            }
          Ae(function () {
            var r = l,
              a = we(n),
              o = [];
            e: {
              var i = Pr.get(e);
              if (void 0 !== i) {
                var u = cn,
                  s = e;
                switch (e) {
                  case 'keypress':
                    if (0 === tn(n)) break e;
                  case 'keydown':
                  case 'keyup':
                    u = Nn;
                    break;
                  case 'focusin':
                    (s = 'focus'), (u = gn);
                    break;
                  case 'focusout':
                    (s = 'blur'), (u = gn);
                    break;
                  case 'beforeblur':
                  case 'afterblur':
                    u = gn;
                    break;
                  case 'click':
                    if (2 === n.button) break e;
                  case 'auxclick':
                  case 'dblclick':
                  case 'mousedown':
                  case 'mousemove':
                  case 'mouseup':
                  case 'mouseout':
                  case 'mouseover':
                  case 'contextmenu':
                    u = hn;
                    break;
                  case 'drag':
                  case 'dragend':
                  case 'dragenter':
                  case 'dragexit':
                  case 'dragleave':
                  case 'dragover':
                  case 'dragstart':
                  case 'drop':
                    u = mn;
                    break;
                  case 'touchcancel':
                  case 'touchend':
                  case 'touchmove':
                  case 'touchstart':
                    u = Tn;
                    break;
                  case Cr:
                  case Nr:
                  case Lr:
                    u = vn;
                    break;
                  case Tr:
                    u = Pn;
                    break;
                  case 'scroll':
                    u = fn;
                    break;
                  case 'wheel':
                    u = zn;
                    break;
                  case 'copy':
                  case 'cut':
                  case 'paste':
                    u = bn;
                    break;
                  case 'gotpointercapture':
                  case 'lostpointercapture':
                  case 'pointercancel':
                  case 'pointerdown':
                  case 'pointermove':
                  case 'pointerout':
                  case 'pointerover':
                  case 'pointerup':
                    u = Ln;
                }
                var c = 0 !== (4 & t),
                  d = !c && 'scroll' === e,
                  f = c ? (null !== i ? i + 'Capture' : null) : i;
                c = [];
                for (var p, h = r; null !== h; ) {
                  var m = (p = h).stateNode;
                  if (
                    (5 === p.tag &&
                      null !== m &&
                      ((p = m),
                      null !== f &&
                        null != (m = ze(h, f)) &&
                        c.push(qr(h, m, p))),
                    d)
                  )
                    break;
                  h = h.return;
                }
                0 < c.length &&
                  ((i = new u(i, s, null, n, a)),
                  o.push({ event: i, listeners: c }));
              }
            }
            if (0 === (7 & t)) {
              if (
                ((u = 'mouseout' === e || 'pointerout' === e),
                (!(i = 'mouseover' === e || 'pointerover' === e) ||
                  n === ke ||
                  !(s = n.relatedTarget || n.fromElement) ||
                  (!ya(s) && !s[ha])) &&
                  (u || i) &&
                  ((i =
                    a.window === a
                      ? a
                      : (i = a.ownerDocument)
                      ? i.defaultView || i.parentWindow
                      : window),
                  u
                    ? ((u = r),
                      null !==
                        (s = (s = n.relatedTarget || n.toElement)
                          ? ya(s)
                          : null) &&
                        (s !== (d = He(s)) || (5 !== s.tag && 6 !== s.tag)) &&
                        (s = null))
                    : ((u = null), (s = r)),
                  u !== s))
              ) {
                if (
                  ((c = hn),
                  (m = 'onMouseLeave'),
                  (f = 'onMouseEnter'),
                  (h = 'mouse'),
                  ('pointerout' !== e && 'pointerover' !== e) ||
                    ((c = Ln),
                    (m = 'onPointerLeave'),
                    (f = 'onPointerEnter'),
                    (h = 'pointer')),
                  (d = null == u ? i : ka(u)),
                  (p = null == s ? i : ka(s)),
                  ((i = new c(m, h + 'leave', u, n, a)).target = d),
                  (i.relatedTarget = p),
                  (m = null),
                  ya(a) === r &&
                    (((c = new c(f, h + 'enter', s, n, a)).target = p),
                    (c.relatedTarget = d),
                    (m = c)),
                  (d = m),
                  u && s)
                )
                  e: {
                    for (f = s, h = 0, p = c = u; p; p = Jr(p)) h++;
                    for (p = 0, m = f; m; m = Jr(m)) p++;
                    for (; 0 < h - p; ) (c = Jr(c)), h--;
                    for (; 0 < p - h; ) (f = Jr(f)), p--;
                    for (; h--; ) {
                      if (c === f || (null !== f && c === f.alternate)) break e;
                      (c = Jr(c)), (f = Jr(f));
                    }
                    c = null;
                  }
                else c = null;
                null !== u && Kr(o, i, u, c, !1),
                  null !== s && null !== d && Kr(o, d, s, c, !0);
              }
              if (
                'select' ===
                  (u =
                    (i = r ? ka(r) : window).nodeName &&
                    i.nodeName.toLowerCase()) ||
                ('input' === u && 'file' === i.type)
              )
                var g = Gn;
              else if (Wn(i))
                if (Xn) g = or;
                else {
                  g = ar;
                  var v = rr;
                }
              else
                (u = i.nodeName) &&
                  'input' === u.toLowerCase() &&
                  ('checkbox' === i.type || 'radio' === i.type) &&
                  (g = lr);
              switch (
                (g && (g = g(e, r))
                  ? qn(o, g, n, a)
                  : (v && v(e, i, r),
                    'focusout' === e &&
                      (v = i._wrapperState) &&
                      v.controlled &&
                      'number' === i.type &&
                      ee(i, 'number', i.value)),
                (v = r ? ka(r) : window),
                e)
              ) {
                case 'focusin':
                  (Wn(v) || 'true' === v.contentEditable) &&
                    ((gr = v), (vr = r), (yr = null));
                  break;
                case 'focusout':
                  yr = vr = gr = null;
                  break;
                case 'mousedown':
                  br = !0;
                  break;
                case 'contextmenu':
                case 'mouseup':
                case 'dragend':
                  (br = !1), kr(o, n, a);
                  break;
                case 'selectionchange':
                  if (mr) break;
                case 'keydown':
                case 'keyup':
                  kr(o, n, a);
              }
              var y;
              if (On)
                e: {
                  switch (e) {
                    case 'compositionstart':
                      var b = 'onCompositionStart';
                      break e;
                    case 'compositionend':
                      b = 'onCompositionEnd';
                      break e;
                    case 'compositionupdate':
                      b = 'onCompositionUpdate';
                      break e;
                  }
                  b = void 0;
                }
              else
                Hn
                  ? Bn(e, n) && (b = 'onCompositionEnd')
                  : 'keydown' === e &&
                    229 === n.keyCode &&
                    (b = 'onCompositionStart');
              b &&
                (Dn &&
                  'ko' !== n.locale &&
                  (Hn || 'onCompositionStart' !== b
                    ? 'onCompositionEnd' === b && Hn && (y = en())
                    : ((Yt = 'value' in (Xt = a) ? Xt.value : Xt.textContent),
                      (Hn = !0))),
                0 < (v = Qr(r, b)).length &&
                  ((b = new kn(b, e, null, n, a)),
                  o.push({ event: b, listeners: v }),
                  y ? (b.data = y) : null !== (y = Vn(n)) && (b.data = y))),
                (y = Mn
                  ? (function (e, t) {
                      switch (e) {
                        case 'compositionend':
                          return Vn(t);
                        case 'keypress':
                          return 32 !== t.which ? null : ((In = !0), Fn);
                        case 'textInput':
                          return (e = t.data) === Fn && In ? null : e;
                        default:
                          return null;
                      }
                    })(e, n)
                  : (function (e, t) {
                      if (Hn)
                        return 'compositionend' === e || (!On && Bn(e, t))
                          ? ((e = en()), ($t = Yt = Xt = null), (Hn = !1), e)
                          : null;
                      switch (e) {
                        case 'paste':
                        default:
                          return null;
                        case 'keypress':
                          if (
                            !(t.ctrlKey || t.altKey || t.metaKey) ||
                            (t.ctrlKey && t.altKey)
                          ) {
                            if (t.char && 1 < t.char.length) return t.char;
                            if (t.which) return String.fromCharCode(t.which);
                          }
                          return null;
                        case 'compositionend':
                          return Dn && 'ko' !== t.locale ? null : t.data;
                      }
                    })(e, n)) &&
                  0 < (r = Qr(r, 'onBeforeInput')).length &&
                  ((a = new kn('onBeforeInput', 'beforeinput', null, n, a)),
                  o.push({ event: a, listeners: r }),
                  (a.data = y));
            }
            Fr(o, t);
          });
        }
        function qr(e, t, n) {
          return { instance: e, listener: t, currentTarget: n };
        }
        function Qr(e, t) {
          for (var n = t + 'Capture', r = []; null !== e; ) {
            var a = e,
              l = a.stateNode;
            5 === a.tag &&
              null !== l &&
              ((a = l),
              null != (l = ze(e, n)) && r.unshift(qr(e, l, a)),
              null != (l = ze(e, t)) && r.push(qr(e, l, a))),
              (e = e.return);
          }
          return r;
        }
        function Jr(e) {
          if (null === e) return null;
          do {
            e = e.return;
          } while (e && 5 !== e.tag);
          return e || null;
        }
        function Kr(e, t, n, r, a) {
          for (var l = t._reactName, o = []; null !== n && n !== r; ) {
            var i = n,
              u = i.alternate,
              s = i.stateNode;
            if (null !== u && u === r) break;
            5 === i.tag &&
              null !== s &&
              ((i = s),
              a
                ? null != (u = ze(n, l)) && o.unshift(qr(n, u, i))
                : a || (null != (u = ze(n, l)) && o.push(qr(n, u, i)))),
              (n = n.return);
          }
          0 !== o.length && e.push({ event: t, listeners: o });
        }
        var Zr = /\r\n?/g,
          Gr = /\u0000|\uFFFD/g;
        function Xr(e) {
          return ('string' === typeof e ? e : '' + e)
            .replace(Zr, '\n')
            .replace(Gr, '');
        }
        function Yr(e, t, n) {
          if (((t = Xr(t)), Xr(e) !== t && n)) throw Error(l(425));
        }
        function $r() {}
        var ea = null,
          ta = null;
        function na(e, t) {
          return (
            'textarea' === e ||
            'noscript' === e ||
            'string' === typeof t.children ||
            'number' === typeof t.children ||
            ('object' === typeof t.dangerouslySetInnerHTML &&
              null !== t.dangerouslySetInnerHTML &&
              null != t.dangerouslySetInnerHTML.__html)
          );
        }
        var ra = 'function' === typeof setTimeout ? setTimeout : void 0,
          aa = 'function' === typeof clearTimeout ? clearTimeout : void 0,
          la = 'function' === typeof Promise ? Promise : void 0,
          oa =
            'function' === typeof queueMicrotask
              ? queueMicrotask
              : 'undefined' !== typeof la
              ? function (e) {
                  return la.resolve(null).then(e).catch(ia);
                }
              : ra;
        function ia(e) {
          setTimeout(function () {
            throw e;
          });
        }
        function ua(e, t) {
          var n = t,
            r = 0;
          do {
            var a = n.nextSibling;
            if ((e.removeChild(n), a && 8 === a.nodeType))
              if ('/$' === (n = a.data)) {
                if (0 === r) return e.removeChild(a), void Ht(t);
                r--;
              } else ('$' !== n && '$?' !== n && '$!' !== n) || r++;
            n = a;
          } while (n);
          Ht(t);
        }
        function sa(e) {
          for (; null != e; e = e.nextSibling) {
            var t = e.nodeType;
            if (1 === t || 3 === t) break;
            if (8 === t) {
              if ('$' === (t = e.data) || '$!' === t || '$?' === t) break;
              if ('/$' === t) return null;
            }
          }
          return e;
        }
        function ca(e) {
          e = e.previousSibling;
          for (var t = 0; e; ) {
            if (8 === e.nodeType) {
              var n = e.data;
              if ('$' === n || '$!' === n || '$?' === n) {
                if (0 === t) return e;
                t--;
              } else '/$' === n && t++;
            }
            e = e.previousSibling;
          }
          return null;
        }
        var da = Math.random().toString(36).slice(2),
          fa = '__reactFiber$' + da,
          pa = '__reactProps$' + da,
          ha = '__reactContainer$' + da,
          ma = '__reactEvents$' + da,
          ga = '__reactListeners$' + da,
          va = '__reactHandles$' + da;
        function ya(e) {
          var t = e[fa];
          if (t) return t;
          for (var n = e.parentNode; n; ) {
            if ((t = n[ha] || n[fa])) {
              if (
                ((n = t.alternate),
                null !== t.child || (null !== n && null !== n.child))
              )
                for (e = ca(e); null !== e; ) {
                  if ((n = e[fa])) return n;
                  e = ca(e);
                }
              return t;
            }
            n = (e = n).parentNode;
          }
          return null;
        }
        function ba(e) {
          return !(e = e[fa] || e[ha]) ||
            (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
            ? null
            : e;
        }
        function ka(e) {
          if (5 === e.tag || 6 === e.tag) return e.stateNode;
          throw Error(l(33));
        }
        function wa(e) {
          return e[pa] || null;
        }
        var Sa = [],
          _a = -1;
        function xa(e) {
          return { current: e };
        }
        function Ea(e) {
          0 > _a || ((e.current = Sa[_a]), (Sa[_a] = null), _a--);
        }
        function Ca(e, t) {
          _a++, (Sa[_a] = e.current), (e.current = t);
        }
        var Na = {},
          La = xa(Na),
          Ta = xa(!1),
          Pa = Na;
        function Aa(e, t) {
          var n = e.type.contextTypes;
          if (!n) return Na;
          var r = e.stateNode;
          if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
            return r.__reactInternalMemoizedMaskedChildContext;
          var a,
            l = {};
          for (a in n) l[a] = t[a];
          return (
            r &&
              (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext =
                t),
              (e.__reactInternalMemoizedMaskedChildContext = l)),
            l
          );
        }
        function za(e) {
          return null !== (e = e.childContextTypes) && void 0 !== e;
        }
        function ja() {
          Ea(Ta), Ea(La);
        }
        function Oa(e, t, n) {
          if (La.current !== Na) throw Error(l(168));
          Ca(La, t), Ca(Ta, n);
        }
        function Ra(e, t, n) {
          var r = e.stateNode;
          if (
            ((t = t.childContextTypes), 'function' !== typeof r.getChildContext)
          )
            return n;
          for (var a in (r = r.getChildContext()))
            if (!(a in t)) throw Error(l(108, U(e) || 'Unknown', a));
          return D({}, n, r);
        }
        function Ma(e) {
          return (
            (e =
              ((e = e.stateNode) &&
                e.__reactInternalMemoizedMergedChildContext) ||
              Na),
            (Pa = La.current),
            Ca(La, e),
            Ca(Ta, Ta.current),
            !0
          );
        }
        function Da(e, t, n) {
          var r = e.stateNode;
          if (!r) throw Error(l(169));
          n
            ? ((e = Ra(e, t, Pa)),
              (r.__reactInternalMemoizedMergedChildContext = e),
              Ea(Ta),
              Ea(La),
              Ca(La, e))
            : Ea(Ta),
            Ca(Ta, n);
        }
        var Fa = null,
          Ia = !1,
          Ba = !1;
        function Va(e) {
          null === Fa ? (Fa = [e]) : Fa.push(e);
        }
        function Ha() {
          if (!Ba && null !== Fa) {
            Ba = !0;
            var e = 0,
              t = bt;
            try {
              var n = Fa;
              for (bt = 1; e < n.length; e++) {
                var r = n[e];
                do {
                  r = r(!0);
                } while (null !== r);
              }
              (Fa = null), (Ia = !1);
            } catch (a) {
              throw (null !== Fa && (Fa = Fa.slice(e + 1)), Je($e, Ha), a);
            } finally {
              (bt = t), (Ba = !1);
            }
          }
          return null;
        }
        var Ua = [],
          Wa = 0,
          qa = null,
          Qa = 0,
          Ja = [],
          Ka = 0,
          Za = null,
          Ga = 1,
          Xa = '';
        function Ya(e, t) {
          (Ua[Wa++] = Qa), (Ua[Wa++] = qa), (qa = e), (Qa = t);
        }
        function $a(e, t, n) {
          (Ja[Ka++] = Ga), (Ja[Ka++] = Xa), (Ja[Ka++] = Za), (Za = e);
          var r = Ga;
          e = Xa;
          var a = 32 - ot(r) - 1;
          (r &= ~(1 << a)), (n += 1);
          var l = 32 - ot(t) + a;
          if (30 < l) {
            var o = a - (a % 5);
            (l = (r & ((1 << o) - 1)).toString(32)),
              (r >>= o),
              (a -= o),
              (Ga = (1 << (32 - ot(t) + a)) | (n << a) | r),
              (Xa = l + e);
          } else (Ga = (1 << l) | (n << a) | r), (Xa = e);
        }
        function el(e) {
          null !== e.return && (Ya(e, 1), $a(e, 1, 0));
        }
        function tl(e) {
          for (; e === qa; )
            (qa = Ua[--Wa]), (Ua[Wa] = null), (Qa = Ua[--Wa]), (Ua[Wa] = null);
          for (; e === Za; )
            (Za = Ja[--Ka]),
              (Ja[Ka] = null),
              (Xa = Ja[--Ka]),
              (Ja[Ka] = null),
              (Ga = Ja[--Ka]),
              (Ja[Ka] = null);
        }
        var nl = null,
          rl = null,
          al = !1,
          ll = null;
        function ol(e, t) {
          var n = As(5, null, null, 0);
          (n.elementType = 'DELETED'),
            (n.stateNode = t),
            (n.return = e),
            null === (t = e.deletions)
              ? ((e.deletions = [n]), (e.flags |= 16))
              : t.push(n);
        }
        function il(e, t) {
          switch (e.tag) {
            case 5:
              var n = e.type;
              return (
                null !==
                  (t =
                    1 !== t.nodeType ||
                    n.toLowerCase() !== t.nodeName.toLowerCase()
                      ? null
                      : t) &&
                ((e.stateNode = t), (nl = e), (rl = sa(t.firstChild)), !0)
              );
            case 6:
              return (
                null !==
                  (t = '' === e.pendingProps || 3 !== t.nodeType ? null : t) &&
                ((e.stateNode = t), (nl = e), (rl = null), !0)
              );
            case 13:
              return (
                null !== (t = 8 !== t.nodeType ? null : t) &&
                ((n = null !== Za ? { id: Ga, overflow: Xa } : null),
                (e.memoizedState = {
                  dehydrated: t,
                  treeContext: n,
                  retryLane: 1073741824,
                }),
                ((n = As(18, null, null, 0)).stateNode = t),
                (n.return = e),
                (e.child = n),
                (nl = e),
                (rl = null),
                !0)
              );
            default:
              return !1;
          }
        }
        function ul(e) {
          return 0 !== (1 & e.mode) && 0 === (128 & e.flags);
        }
        function sl(e) {
          if (al) {
            var t = rl;
            if (t) {
              var n = t;
              if (!il(e, t)) {
                if (ul(e)) throw Error(l(418));
                t = sa(n.nextSibling);
                var r = nl;
                t && il(e, t)
                  ? ol(r, n)
                  : ((e.flags = (-4097 & e.flags) | 2), (al = !1), (nl = e));
              }
            } else {
              if (ul(e)) throw Error(l(418));
              (e.flags = (-4097 & e.flags) | 2), (al = !1), (nl = e);
            }
          }
        }
        function cl(e) {
          for (
            e = e.return;
            null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;

          )
            e = e.return;
          nl = e;
        }
        function dl(e) {
          if (e !== nl) return !1;
          if (!al) return cl(e), (al = !0), !1;
          var t;
          if (
            ((t = 3 !== e.tag) &&
              !(t = 5 !== e.tag) &&
              (t =
                'head' !== (t = e.type) &&
                'body' !== t &&
                !na(e.type, e.memoizedProps)),
            t && (t = rl))
          ) {
            if (ul(e)) throw (fl(), Error(l(418)));
            for (; t; ) ol(e, t), (t = sa(t.nextSibling));
          }
          if ((cl(e), 13 === e.tag)) {
            if (!(e = null !== (e = e.memoizedState) ? e.dehydrated : null))
              throw Error(l(317));
            e: {
              for (e = e.nextSibling, t = 0; e; ) {
                if (8 === e.nodeType) {
                  var n = e.data;
                  if ('/$' === n) {
                    if (0 === t) {
                      rl = sa(e.nextSibling);
                      break e;
                    }
                    t--;
                  } else ('$' !== n && '$!' !== n && '$?' !== n) || t++;
                }
                e = e.nextSibling;
              }
              rl = null;
            }
          } else rl = nl ? sa(e.stateNode.nextSibling) : null;
          return !0;
        }
        function fl() {
          for (var e = rl; e; ) e = sa(e.nextSibling);
        }
        function pl() {
          (rl = nl = null), (al = !1);
        }
        function hl(e) {
          null === ll ? (ll = [e]) : ll.push(e);
        }
        var ml = k.ReactCurrentBatchConfig;
        function gl(e, t, n) {
          if (
            null !== (e = n.ref) &&
            'function' !== typeof e &&
            'object' !== typeof e
          ) {
            if (n._owner) {
              if ((n = n._owner)) {
                if (1 !== n.tag) throw Error(l(309));
                var r = n.stateNode;
              }
              if (!r) throw Error(l(147, e));
              var a = r,
                o = '' + e;
              return null !== t &&
                null !== t.ref &&
                'function' === typeof t.ref &&
                t.ref._stringRef === o
                ? t.ref
                : ((t = function (e) {
                    var t = a.refs;
                    null === e ? delete t[o] : (t[o] = e);
                  }),
                  (t._stringRef = o),
                  t);
            }
            if ('string' !== typeof e) throw Error(l(284));
            if (!n._owner) throw Error(l(290, e));
          }
          return e;
        }
        function vl(e, t) {
          throw (
            ((e = Object.prototype.toString.call(t)),
            Error(
              l(
                31,
                '[object Object]' === e
                  ? 'object with keys {' + Object.keys(t).join(', ') + '}'
                  : e
              )
            ))
          );
        }
        function yl(e) {
          return (0, e._init)(e._payload);
        }
        function bl(e) {
          function t(t, n) {
            if (e) {
              var r = t.deletions;
              null === r ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
            }
          }
          function n(n, r) {
            if (!e) return null;
            for (; null !== r; ) t(n, r), (r = r.sibling);
            return null;
          }
          function r(e, t) {
            for (e = new Map(); null !== t; )
              null !== t.key ? e.set(t.key, t) : e.set(t.index, t),
                (t = t.sibling);
            return e;
          }
          function a(e, t) {
            return ((e = js(e, t)).index = 0), (e.sibling = null), e;
          }
          function o(t, n, r) {
            return (
              (t.index = r),
              e
                ? null !== (r = t.alternate)
                  ? (r = r.index) < n
                    ? ((t.flags |= 2), n)
                    : r
                  : ((t.flags |= 2), n)
                : ((t.flags |= 1048576), n)
            );
          }
          function i(t) {
            return e && null === t.alternate && (t.flags |= 2), t;
          }
          function u(e, t, n, r) {
            return null === t || 6 !== t.tag
              ? (((t = Ds(n, e.mode, r)).return = e), t)
              : (((t = a(t, n)).return = e), t);
          }
          function s(e, t, n, r) {
            var l = n.type;
            return l === _
              ? d(e, t, n.props.children, r, n.key)
              : null !== t &&
                (t.elementType === l ||
                  ('object' === typeof l &&
                    null !== l &&
                    l.$$typeof === z &&
                    yl(l) === t.type))
              ? (((r = a(t, n.props)).ref = gl(e, t, n)), (r.return = e), r)
              : (((r = Os(n.type, n.key, n.props, null, e.mode, r)).ref = gl(
                  e,
                  t,
                  n
                )),
                (r.return = e),
                r);
          }
          function c(e, t, n, r) {
            return null === t ||
              4 !== t.tag ||
              t.stateNode.containerInfo !== n.containerInfo ||
              t.stateNode.implementation !== n.implementation
              ? (((t = Fs(n, e.mode, r)).return = e), t)
              : (((t = a(t, n.children || [])).return = e), t);
          }
          function d(e, t, n, r, l) {
            return null === t || 7 !== t.tag
              ? (((t = Rs(n, e.mode, r, l)).return = e), t)
              : (((t = a(t, n)).return = e), t);
          }
          function f(e, t, n) {
            if (('string' === typeof t && '' !== t) || 'number' === typeof t)
              return ((t = Ds('' + t, e.mode, n)).return = e), t;
            if ('object' === typeof t && null !== t) {
              switch (t.$$typeof) {
                case w:
                  return (
                    ((n = Os(t.type, t.key, t.props, null, e.mode, n)).ref = gl(
                      e,
                      null,
                      t
                    )),
                    (n.return = e),
                    n
                  );
                case S:
                  return ((t = Fs(t, e.mode, n)).return = e), t;
                case z:
                  return f(e, (0, t._init)(t._payload), n);
              }
              if (te(t) || R(t))
                return ((t = Rs(t, e.mode, n, null)).return = e), t;
              vl(e, t);
            }
            return null;
          }
          function p(e, t, n, r) {
            var a = null !== t ? t.key : null;
            if (('string' === typeof n && '' !== n) || 'number' === typeof n)
              return null !== a ? null : u(e, t, '' + n, r);
            if ('object' === typeof n && null !== n) {
              switch (n.$$typeof) {
                case w:
                  return n.key === a ? s(e, t, n, r) : null;
                case S:
                  return n.key === a ? c(e, t, n, r) : null;
                case z:
                  return p(e, t, (a = n._init)(n._payload), r);
              }
              if (te(n) || R(n)) return null !== a ? null : d(e, t, n, r, null);
              vl(e, n);
            }
            return null;
          }
          function h(e, t, n, r, a) {
            if (('string' === typeof r && '' !== r) || 'number' === typeof r)
              return u(t, (e = e.get(n) || null), '' + r, a);
            if ('object' === typeof r && null !== r) {
              switch (r.$$typeof) {
                case w:
                  return s(
                    t,
                    (e = e.get(null === r.key ? n : r.key) || null),
                    r,
                    a
                  );
                case S:
                  return c(
                    t,
                    (e = e.get(null === r.key ? n : r.key) || null),
                    r,
                    a
                  );
                case z:
                  return h(e, t, n, (0, r._init)(r._payload), a);
              }
              if (te(r) || R(r))
                return d(t, (e = e.get(n) || null), r, a, null);
              vl(t, r);
            }
            return null;
          }
          function m(a, l, i, u) {
            for (
              var s = null, c = null, d = l, m = (l = 0), g = null;
              null !== d && m < i.length;
              m++
            ) {
              d.index > m ? ((g = d), (d = null)) : (g = d.sibling);
              var v = p(a, d, i[m], u);
              if (null === v) {
                null === d && (d = g);
                break;
              }
              e && d && null === v.alternate && t(a, d),
                (l = o(v, l, m)),
                null === c ? (s = v) : (c.sibling = v),
                (c = v),
                (d = g);
            }
            if (m === i.length) return n(a, d), al && Ya(a, m), s;
            if (null === d) {
              for (; m < i.length; m++)
                null !== (d = f(a, i[m], u)) &&
                  ((l = o(d, l, m)),
                  null === c ? (s = d) : (c.sibling = d),
                  (c = d));
              return al && Ya(a, m), s;
            }
            for (d = r(a, d); m < i.length; m++)
              null !== (g = h(d, a, m, i[m], u)) &&
                (e &&
                  null !== g.alternate &&
                  d.delete(null === g.key ? m : g.key),
                (l = o(g, l, m)),
                null === c ? (s = g) : (c.sibling = g),
                (c = g));
            return (
              e &&
                d.forEach(function (e) {
                  return t(a, e);
                }),
              al && Ya(a, m),
              s
            );
          }
          function g(a, i, u, s) {
            var c = R(u);
            if ('function' !== typeof c) throw Error(l(150));
            if (null == (u = c.call(u))) throw Error(l(151));
            for (
              var d = (c = null), m = i, g = (i = 0), v = null, y = u.next();
              null !== m && !y.done;
              g++, y = u.next()
            ) {
              m.index > g ? ((v = m), (m = null)) : (v = m.sibling);
              var b = p(a, m, y.value, s);
              if (null === b) {
                null === m && (m = v);
                break;
              }
              e && m && null === b.alternate && t(a, m),
                (i = o(b, i, g)),
                null === d ? (c = b) : (d.sibling = b),
                (d = b),
                (m = v);
            }
            if (y.done) return n(a, m), al && Ya(a, g), c;
            if (null === m) {
              for (; !y.done; g++, y = u.next())
                null !== (y = f(a, y.value, s)) &&
                  ((i = o(y, i, g)),
                  null === d ? (c = y) : (d.sibling = y),
                  (d = y));
              return al && Ya(a, g), c;
            }
            for (m = r(a, m); !y.done; g++, y = u.next())
              null !== (y = h(m, a, g, y.value, s)) &&
                (e &&
                  null !== y.alternate &&
                  m.delete(null === y.key ? g : y.key),
                (i = o(y, i, g)),
                null === d ? (c = y) : (d.sibling = y),
                (d = y));
            return (
              e &&
                m.forEach(function (e) {
                  return t(a, e);
                }),
              al && Ya(a, g),
              c
            );
          }
          return function e(r, l, o, u) {
            if (
              ('object' === typeof o &&
                null !== o &&
                o.type === _ &&
                null === o.key &&
                (o = o.props.children),
              'object' === typeof o && null !== o)
            ) {
              switch (o.$$typeof) {
                case w:
                  e: {
                    for (var s = o.key, c = l; null !== c; ) {
                      if (c.key === s) {
                        if ((s = o.type) === _) {
                          if (7 === c.tag) {
                            n(r, c.sibling),
                              ((l = a(c, o.props.children)).return = r),
                              (r = l);
                            break e;
                          }
                        } else if (
                          c.elementType === s ||
                          ('object' === typeof s &&
                            null !== s &&
                            s.$$typeof === z &&
                            yl(s) === c.type)
                        ) {
                          n(r, c.sibling),
                            ((l = a(c, o.props)).ref = gl(r, c, o)),
                            (l.return = r),
                            (r = l);
                          break e;
                        }
                        n(r, c);
                        break;
                      }
                      t(r, c), (c = c.sibling);
                    }
                    o.type === _
                      ? (((l = Rs(o.props.children, r.mode, u, o.key)).return =
                          r),
                        (r = l))
                      : (((u = Os(
                          o.type,
                          o.key,
                          o.props,
                          null,
                          r.mode,
                          u
                        )).ref = gl(r, l, o)),
                        (u.return = r),
                        (r = u));
                  }
                  return i(r);
                case S:
                  e: {
                    for (c = o.key; null !== l; ) {
                      if (l.key === c) {
                        if (
                          4 === l.tag &&
                          l.stateNode.containerInfo === o.containerInfo &&
                          l.stateNode.implementation === o.implementation
                        ) {
                          n(r, l.sibling),
                            ((l = a(l, o.children || [])).return = r),
                            (r = l);
                          break e;
                        }
                        n(r, l);
                        break;
                      }
                      t(r, l), (l = l.sibling);
                    }
                    ((l = Fs(o, r.mode, u)).return = r), (r = l);
                  }
                  return i(r);
                case z:
                  return e(r, l, (c = o._init)(o._payload), u);
              }
              if (te(o)) return m(r, l, o, u);
              if (R(o)) return g(r, l, o, u);
              vl(r, o);
            }
            return ('string' === typeof o && '' !== o) || 'number' === typeof o
              ? ((o = '' + o),
                null !== l && 6 === l.tag
                  ? (n(r, l.sibling), ((l = a(l, o)).return = r), (r = l))
                  : (n(r, l), ((l = Ds(o, r.mode, u)).return = r), (r = l)),
                i(r))
              : n(r, l);
          };
        }
        var kl = bl(!0),
          wl = bl(!1),
          Sl = xa(null),
          _l = null,
          xl = null,
          El = null;
        function Cl() {
          El = xl = _l = null;
        }
        function Nl(e) {
          var t = Sl.current;
          Ea(Sl), (e._currentValue = t);
        }
        function Ll(e, t, n) {
          for (; null !== e; ) {
            var r = e.alternate;
            if (
              ((e.childLanes & t) !== t
                ? ((e.childLanes |= t), null !== r && (r.childLanes |= t))
                : null !== r && (r.childLanes & t) !== t && (r.childLanes |= t),
              e === n)
            )
              break;
            e = e.return;
          }
        }
        function Tl(e, t) {
          (_l = e),
            (El = xl = null),
            null !== (e = e.dependencies) &&
              null !== e.firstContext &&
              (0 !== (e.lanes & t) && (bi = !0), (e.firstContext = null));
        }
        function Pl(e) {
          var t = e._currentValue;
          if (El !== e)
            if (
              ((e = { context: e, memoizedValue: t, next: null }), null === xl)
            ) {
              if (null === _l) throw Error(l(308));
              (xl = e), (_l.dependencies = { lanes: 0, firstContext: e });
            } else xl = xl.next = e;
          return t;
        }
        var Al = null;
        function zl(e) {
          null === Al ? (Al = [e]) : Al.push(e);
        }
        function jl(e, t, n, r) {
          var a = t.interleaved;
          return (
            null === a
              ? ((n.next = n), zl(t))
              : ((n.next = a.next), (a.next = n)),
            (t.interleaved = n),
            Ol(e, r)
          );
        }
        function Ol(e, t) {
          e.lanes |= t;
          var n = e.alternate;
          for (null !== n && (n.lanes |= t), n = e, e = e.return; null !== e; )
            (e.childLanes |= t),
              null !== (n = e.alternate) && (n.childLanes |= t),
              (n = e),
              (e = e.return);
          return 3 === n.tag ? n.stateNode : null;
        }
        var Rl = !1;
        function Ml(e) {
          e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: { pending: null, interleaved: null, lanes: 0 },
            effects: null,
          };
        }
        function Dl(e, t) {
          (e = e.updateQueue),
            t.updateQueue === e &&
              (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                effects: e.effects,
              });
        }
        function Fl(e, t) {
          return {
            eventTime: e,
            lane: t,
            tag: 0,
            payload: null,
            callback: null,
            next: null,
          };
        }
        function Il(e, t, n) {
          var r = e.updateQueue;
          if (null === r) return null;
          if (((r = r.shared), 0 !== (2 & Lu))) {
            var a = r.pending;
            return (
              null === a ? (t.next = t) : ((t.next = a.next), (a.next = t)),
              (r.pending = t),
              Ol(e, n)
            );
          }
          return (
            null === (a = r.interleaved)
              ? ((t.next = t), zl(r))
              : ((t.next = a.next), (a.next = t)),
            (r.interleaved = t),
            Ol(e, n)
          );
        }
        function Bl(e, t, n) {
          if (
            null !== (t = t.updateQueue) &&
            ((t = t.shared), 0 !== (4194240 & n))
          ) {
            var r = t.lanes;
            (n |= r &= e.pendingLanes), (t.lanes = n), yt(e, n);
          }
        }
        function Vl(e, t) {
          var n = e.updateQueue,
            r = e.alternate;
          if (null !== r && n === (r = r.updateQueue)) {
            var a = null,
              l = null;
            if (null !== (n = n.firstBaseUpdate)) {
              do {
                var o = {
                  eventTime: n.eventTime,
                  lane: n.lane,
                  tag: n.tag,
                  payload: n.payload,
                  callback: n.callback,
                  next: null,
                };
                null === l ? (a = l = o) : (l = l.next = o), (n = n.next);
              } while (null !== n);
              null === l ? (a = l = t) : (l = l.next = t);
            } else a = l = t;
            return (
              (n = {
                baseState: r.baseState,
                firstBaseUpdate: a,
                lastBaseUpdate: l,
                shared: r.shared,
                effects: r.effects,
              }),
              void (e.updateQueue = n)
            );
          }
          null === (e = n.lastBaseUpdate)
            ? (n.firstBaseUpdate = t)
            : (e.next = t),
            (n.lastBaseUpdate = t);
        }
        function Hl(e, t, n, r) {
          var a = e.updateQueue;
          Rl = !1;
          var l = a.firstBaseUpdate,
            o = a.lastBaseUpdate,
            i = a.shared.pending;
          if (null !== i) {
            a.shared.pending = null;
            var u = i,
              s = u.next;
            (u.next = null), null === o ? (l = s) : (o.next = s), (o = u);
            var c = e.alternate;
            null !== c &&
              (i = (c = c.updateQueue).lastBaseUpdate) !== o &&
              (null === i ? (c.firstBaseUpdate = s) : (i.next = s),
              (c.lastBaseUpdate = u));
          }
          if (null !== l) {
            var d = a.baseState;
            for (o = 0, c = s = u = null, i = l; ; ) {
              var f = i.lane,
                p = i.eventTime;
              if ((r & f) === f) {
                null !== c &&
                  (c = c.next =
                    {
                      eventTime: p,
                      lane: 0,
                      tag: i.tag,
                      payload: i.payload,
                      callback: i.callback,
                      next: null,
                    });
                e: {
                  var h = e,
                    m = i;
                  switch (((f = t), (p = n), m.tag)) {
                    case 1:
                      if ('function' === typeof (h = m.payload)) {
                        d = h.call(p, d, f);
                        break e;
                      }
                      d = h;
                      break e;
                    case 3:
                      h.flags = (-65537 & h.flags) | 128;
                    case 0:
                      if (
                        null ===
                          (f =
                            'function' === typeof (h = m.payload)
                              ? h.call(p, d, f)
                              : h) ||
                        void 0 === f
                      )
                        break e;
                      d = D({}, d, f);
                      break e;
                    case 2:
                      Rl = !0;
                  }
                }
                null !== i.callback &&
                  0 !== i.lane &&
                  ((e.flags |= 64),
                  null === (f = a.effects) ? (a.effects = [i]) : f.push(i));
              } else
                (p = {
                  eventTime: p,
                  lane: f,
                  tag: i.tag,
                  payload: i.payload,
                  callback: i.callback,
                  next: null,
                }),
                  null === c ? ((s = c = p), (u = d)) : (c = c.next = p),
                  (o |= f);
              if (null === (i = i.next)) {
                if (null === (i = a.shared.pending)) break;
                (i = (f = i).next),
                  (f.next = null),
                  (a.lastBaseUpdate = f),
                  (a.shared.pending = null);
              }
            }
            if (
              (null === c && (u = d),
              (a.baseState = u),
              (a.firstBaseUpdate = s),
              (a.lastBaseUpdate = c),
              null !== (t = a.shared.interleaved))
            ) {
              a = t;
              do {
                (o |= a.lane), (a = a.next);
              } while (a !== t);
            } else null === l && (a.shared.lanes = 0);
            (Mu |= o), (e.lanes = o), (e.memoizedState = d);
          }
        }
        function Ul(e, t, n) {
          if (((e = t.effects), (t.effects = null), null !== e))
            for (t = 0; t < e.length; t++) {
              var r = e[t],
                a = r.callback;
              if (null !== a) {
                if (((r.callback = null), (r = n), 'function' !== typeof a))
                  throw Error(l(191, a));
                a.call(r);
              }
            }
        }
        var Wl = {},
          ql = xa(Wl),
          Ql = xa(Wl),
          Jl = xa(Wl);
        function Kl(e) {
          if (e === Wl) throw Error(l(174));
          return e;
        }
        function Zl(e, t) {
          switch ((Ca(Jl, t), Ca(Ql, e), Ca(ql, Wl), (e = t.nodeType))) {
            case 9:
            case 11:
              t = (t = t.documentElement) ? t.namespaceURI : ue(null, '');
              break;
            default:
              t = ue(
                (t = (e = 8 === e ? t.parentNode : t).namespaceURI || null),
                (e = e.tagName)
              );
          }
          Ea(ql), Ca(ql, t);
        }
        function Gl() {
          Ea(ql), Ea(Ql), Ea(Jl);
        }
        function Xl(e) {
          Kl(Jl.current);
          var t = Kl(ql.current),
            n = ue(t, e.type);
          t !== n && (Ca(Ql, e), Ca(ql, n));
        }
        function Yl(e) {
          Ql.current === e && (Ea(ql), Ea(Ql));
        }
        var $l = xa(0);
        function eo(e) {
          for (var t = e; null !== t; ) {
            if (13 === t.tag) {
              var n = t.memoizedState;
              if (
                null !== n &&
                (null === (n = n.dehydrated) ||
                  '$?' === n.data ||
                  '$!' === n.data)
              )
                return t;
            } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
              if (0 !== (128 & t.flags)) return t;
            } else if (null !== t.child) {
              (t.child.return = t), (t = t.child);
              continue;
            }
            if (t === e) break;
            for (; null === t.sibling; ) {
              if (null === t.return || t.return === e) return null;
              t = t.return;
            }
            (t.sibling.return = t.return), (t = t.sibling);
          }
          return null;
        }
        var to = [];
        function no() {
          for (var e = 0; e < to.length; e++)
            to[e]._workInProgressVersionPrimary = null;
          to.length = 0;
        }
        var ro = k.ReactCurrentDispatcher,
          ao = k.ReactCurrentBatchConfig,
          lo = 0,
          oo = null,
          io = null,
          uo = null,
          so = !1,
          co = !1,
          fo = 0,
          po = 0;
        function ho() {
          throw Error(l(321));
        }
        function mo(e, t) {
          if (null === t) return !1;
          for (var n = 0; n < t.length && n < e.length; n++)
            if (!ir(e[n], t[n])) return !1;
          return !0;
        }
        function go(e, t, n, r, a, o) {
          if (
            ((lo = o),
            (oo = t),
            (t.memoizedState = null),
            (t.updateQueue = null),
            (t.lanes = 0),
            (ro.current = null === e || null === e.memoizedState ? $o : ei),
            (e = n(r, a)),
            co)
          ) {
            o = 0;
            do {
              if (((co = !1), (fo = 0), 25 <= o)) throw Error(l(301));
              (o += 1),
                (uo = io = null),
                (t.updateQueue = null),
                (ro.current = ti),
                (e = n(r, a));
            } while (co);
          }
          if (
            ((ro.current = Yo),
            (t = null !== io && null !== io.next),
            (lo = 0),
            (uo = io = oo = null),
            (so = !1),
            t)
          )
            throw Error(l(300));
          return e;
        }
        function vo() {
          var e = 0 !== fo;
          return (fo = 0), e;
        }
        function yo() {
          var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null,
          };
          return (
            null === uo ? (oo.memoizedState = uo = e) : (uo = uo.next = e), uo
          );
        }
        function bo() {
          if (null === io) {
            var e = oo.alternate;
            e = null !== e ? e.memoizedState : null;
          } else e = io.next;
          var t = null === uo ? oo.memoizedState : uo.next;
          if (null !== t) (uo = t), (io = e);
          else {
            if (null === e) throw Error(l(310));
            (e = {
              memoizedState: (io = e).memoizedState,
              baseState: io.baseState,
              baseQueue: io.baseQueue,
              queue: io.queue,
              next: null,
            }),
              null === uo ? (oo.memoizedState = uo = e) : (uo = uo.next = e);
          }
          return uo;
        }
        function ko(e, t) {
          return 'function' === typeof t ? t(e) : t;
        }
        function wo(e) {
          var t = bo(),
            n = t.queue;
          if (null === n) throw Error(l(311));
          n.lastRenderedReducer = e;
          var r = io,
            a = r.baseQueue,
            o = n.pending;
          if (null !== o) {
            if (null !== a) {
              var i = a.next;
              (a.next = o.next), (o.next = i);
            }
            (r.baseQueue = a = o), (n.pending = null);
          }
          if (null !== a) {
            (o = a.next), (r = r.baseState);
            var u = (i = null),
              s = null,
              c = o;
            do {
              var d = c.lane;
              if ((lo & d) === d)
                null !== s &&
                  (s = s.next =
                    {
                      lane: 0,
                      action: c.action,
                      hasEagerState: c.hasEagerState,
                      eagerState: c.eagerState,
                      next: null,
                    }),
                  (r = c.hasEagerState ? c.eagerState : e(r, c.action));
              else {
                var f = {
                  lane: d,
                  action: c.action,
                  hasEagerState: c.hasEagerState,
                  eagerState: c.eagerState,
                  next: null,
                };
                null === s ? ((u = s = f), (i = r)) : (s = s.next = f),
                  (oo.lanes |= d),
                  (Mu |= d);
              }
              c = c.next;
            } while (null !== c && c !== o);
            null === s ? (i = r) : (s.next = u),
              ir(r, t.memoizedState) || (bi = !0),
              (t.memoizedState = r),
              (t.baseState = i),
              (t.baseQueue = s),
              (n.lastRenderedState = r);
          }
          if (null !== (e = n.interleaved)) {
            a = e;
            do {
              (o = a.lane), (oo.lanes |= o), (Mu |= o), (a = a.next);
            } while (a !== e);
          } else null === a && (n.lanes = 0);
          return [t.memoizedState, n.dispatch];
        }
        function So(e) {
          var t = bo(),
            n = t.queue;
          if (null === n) throw Error(l(311));
          n.lastRenderedReducer = e;
          var r = n.dispatch,
            a = n.pending,
            o = t.memoizedState;
          if (null !== a) {
            n.pending = null;
            var i = (a = a.next);
            do {
              (o = e(o, i.action)), (i = i.next);
            } while (i !== a);
            ir(o, t.memoizedState) || (bi = !0),
              (t.memoizedState = o),
              null === t.baseQueue && (t.baseState = o),
              (n.lastRenderedState = o);
          }
          return [o, r];
        }
        function _o() {}
        function xo(e, t) {
          var n = oo,
            r = bo(),
            a = t(),
            o = !ir(r.memoizedState, a);
          if (
            (o && ((r.memoizedState = a), (bi = !0)),
            (r = r.queue),
            Mo(No.bind(null, n, r, e), [e]),
            r.getSnapshot !== t ||
              o ||
              (null !== uo && 1 & uo.memoizedState.tag))
          ) {
            if (
              ((n.flags |= 2048),
              Ao(9, Co.bind(null, n, r, a, t), void 0, null),
              null === Tu)
            )
              throw Error(l(349));
            0 !== (30 & lo) || Eo(n, t, a);
          }
          return a;
        }
        function Eo(e, t, n) {
          (e.flags |= 16384),
            (e = { getSnapshot: t, value: n }),
            null === (t = oo.updateQueue)
              ? ((t = { lastEffect: null, stores: null }),
                (oo.updateQueue = t),
                (t.stores = [e]))
              : null === (n = t.stores)
              ? (t.stores = [e])
              : n.push(e);
        }
        function Co(e, t, n, r) {
          (t.value = n), (t.getSnapshot = r), Lo(t) && To(e);
        }
        function No(e, t, n) {
          return n(function () {
            Lo(t) && To(e);
          });
        }
        function Lo(e) {
          var t = e.getSnapshot;
          e = e.value;
          try {
            var n = t();
            return !ir(e, n);
          } catch (r) {
            return !0;
          }
        }
        function To(e) {
          var t = Ol(e, 1);
          null !== t && ns(t, e, 1, -1);
        }
        function Po(e) {
          var t = yo();
          return (
            'function' === typeof e && (e = e()),
            (t.memoizedState = t.baseState = e),
            (e = {
              pending: null,
              interleaved: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: ko,
              lastRenderedState: e,
            }),
            (t.queue = e),
            (e = e.dispatch = Ko.bind(null, oo, e)),
            [t.memoizedState, e]
          );
        }
        function Ao(e, t, n, r) {
          return (
            (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
            null === (t = oo.updateQueue)
              ? ((t = { lastEffect: null, stores: null }),
                (oo.updateQueue = t),
                (t.lastEffect = e.next = e))
              : null === (n = t.lastEffect)
              ? (t.lastEffect = e.next = e)
              : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e)),
            e
          );
        }
        function zo() {
          return bo().memoizedState;
        }
        function jo(e, t, n, r) {
          var a = yo();
          (oo.flags |= e),
            (a.memoizedState = Ao(1 | t, n, void 0, void 0 === r ? null : r));
        }
        function Oo(e, t, n, r) {
          var a = bo();
          r = void 0 === r ? null : r;
          var l = void 0;
          if (null !== io) {
            var o = io.memoizedState;
            if (((l = o.destroy), null !== r && mo(r, o.deps)))
              return void (a.memoizedState = Ao(t, n, l, r));
          }
          (oo.flags |= e), (a.memoizedState = Ao(1 | t, n, l, r));
        }
        function Ro(e, t) {
          return jo(8390656, 8, e, t);
        }
        function Mo(e, t) {
          return Oo(2048, 8, e, t);
        }
        function Do(e, t) {
          return Oo(4, 2, e, t);
        }
        function Fo(e, t) {
          return Oo(4, 4, e, t);
        }
        function Io(e, t) {
          return 'function' === typeof t
            ? ((e = e()),
              t(e),
              function () {
                t(null);
              })
            : null !== t && void 0 !== t
            ? ((e = e()),
              (t.current = e),
              function () {
                t.current = null;
              })
            : void 0;
        }
        function Bo(e, t, n) {
          return (
            (n = null !== n && void 0 !== n ? n.concat([e]) : null),
            Oo(4, 4, Io.bind(null, t, e), n)
          );
        }
        function Vo() {}
        function Ho(e, t) {
          var n = bo();
          t = void 0 === t ? null : t;
          var r = n.memoizedState;
          return null !== r && null !== t && mo(t, r[1])
            ? r[0]
            : ((n.memoizedState = [e, t]), e);
        }
        function Uo(e, t) {
          var n = bo();
          t = void 0 === t ? null : t;
          var r = n.memoizedState;
          return null !== r && null !== t && mo(t, r[1])
            ? r[0]
            : ((e = e()), (n.memoizedState = [e, t]), e);
        }
        function Wo(e, t, n) {
          return 0 === (21 & lo)
            ? (e.baseState && ((e.baseState = !1), (bi = !0)),
              (e.memoizedState = n))
            : (ir(n, t) ||
                ((n = mt()), (oo.lanes |= n), (Mu |= n), (e.baseState = !0)),
              t);
        }
        function qo(e, t) {
          var n = bt;
          (bt = 0 !== n && 4 > n ? n : 4), e(!0);
          var r = ao.transition;
          ao.transition = {};
          try {
            e(!1), t();
          } finally {
            (bt = n), (ao.transition = r);
          }
        }
        function Qo() {
          return bo().memoizedState;
        }
        function Jo(e, t, n) {
          var r = ts(e);
          if (
            ((n = {
              lane: r,
              action: n,
              hasEagerState: !1,
              eagerState: null,
              next: null,
            }),
            Zo(e))
          )
            Go(t, n);
          else if (null !== (n = jl(e, t, n, r))) {
            ns(n, e, r, es()), Xo(n, t, r);
          }
        }
        function Ko(e, t, n) {
          var r = ts(e),
            a = {
              lane: r,
              action: n,
              hasEagerState: !1,
              eagerState: null,
              next: null,
            };
          if (Zo(e)) Go(t, a);
          else {
            var l = e.alternate;
            if (
              0 === e.lanes &&
              (null === l || 0 === l.lanes) &&
              null !== (l = t.lastRenderedReducer)
            )
              try {
                var o = t.lastRenderedState,
                  i = l(o, n);
                if (((a.hasEagerState = !0), (a.eagerState = i), ir(i, o))) {
                  var u = t.interleaved;
                  return (
                    null === u
                      ? ((a.next = a), zl(t))
                      : ((a.next = u.next), (u.next = a)),
                    void (t.interleaved = a)
                  );
                }
              } catch (s) {}
            null !== (n = jl(e, t, a, r)) &&
              (ns(n, e, r, (a = es())), Xo(n, t, r));
          }
        }
        function Zo(e) {
          var t = e.alternate;
          return e === oo || (null !== t && t === oo);
        }
        function Go(e, t) {
          co = so = !0;
          var n = e.pending;
          null === n ? (t.next = t) : ((t.next = n.next), (n.next = t)),
            (e.pending = t);
        }
        function Xo(e, t, n) {
          if (0 !== (4194240 & n)) {
            var r = t.lanes;
            (n |= r &= e.pendingLanes), (t.lanes = n), yt(e, n);
          }
        }
        var Yo = {
            readContext: Pl,
            useCallback: ho,
            useContext: ho,
            useEffect: ho,
            useImperativeHandle: ho,
            useInsertionEffect: ho,
            useLayoutEffect: ho,
            useMemo: ho,
            useReducer: ho,
            useRef: ho,
            useState: ho,
            useDebugValue: ho,
            useDeferredValue: ho,
            useTransition: ho,
            useMutableSource: ho,
            useSyncExternalStore: ho,
            useId: ho,
            unstable_isNewReconciler: !1,
          },
          $o = {
            readContext: Pl,
            useCallback: function (e, t) {
              return (yo().memoizedState = [e, void 0 === t ? null : t]), e;
            },
            useContext: Pl,
            useEffect: Ro,
            useImperativeHandle: function (e, t, n) {
              return (
                (n = null !== n && void 0 !== n ? n.concat([e]) : null),
                jo(4194308, 4, Io.bind(null, t, e), n)
              );
            },
            useLayoutEffect: function (e, t) {
              return jo(4194308, 4, e, t);
            },
            useInsertionEffect: function (e, t) {
              return jo(4, 2, e, t);
            },
            useMemo: function (e, t) {
              var n = yo();
              return (
                (t = void 0 === t ? null : t),
                (e = e()),
                (n.memoizedState = [e, t]),
                e
              );
            },
            useReducer: function (e, t, n) {
              var r = yo();
              return (
                (t = void 0 !== n ? n(t) : t),
                (r.memoizedState = r.baseState = t),
                (e = {
                  pending: null,
                  interleaved: null,
                  lanes: 0,
                  dispatch: null,
                  lastRenderedReducer: e,
                  lastRenderedState: t,
                }),
                (r.queue = e),
                (e = e.dispatch = Jo.bind(null, oo, e)),
                [r.memoizedState, e]
              );
            },
            useRef: function (e) {
              return (e = { current: e }), (yo().memoizedState = e);
            },
            useState: Po,
            useDebugValue: Vo,
            useDeferredValue: function (e) {
              return (yo().memoizedState = e);
            },
            useTransition: function () {
              var e = Po(!1),
                t = e[0];
              return (
                (e = qo.bind(null, e[1])), (yo().memoizedState = e), [t, e]
              );
            },
            useMutableSource: function () {},
            useSyncExternalStore: function (e, t, n) {
              var r = oo,
                a = yo();
              if (al) {
                if (void 0 === n) throw Error(l(407));
                n = n();
              } else {
                if (((n = t()), null === Tu)) throw Error(l(349));
                0 !== (30 & lo) || Eo(r, t, n);
              }
              a.memoizedState = n;
              var o = { value: n, getSnapshot: t };
              return (
                (a.queue = o),
                Ro(No.bind(null, r, o, e), [e]),
                (r.flags |= 2048),
                Ao(9, Co.bind(null, r, o, n, t), void 0, null),
                n
              );
            },
            useId: function () {
              var e = yo(),
                t = Tu.identifierPrefix;
              if (al) {
                var n = Xa;
                (t =
                  ':' +
                  t +
                  'R' +
                  (n = (Ga & ~(1 << (32 - ot(Ga) - 1))).toString(32) + n)),
                  0 < (n = fo++) && (t += 'H' + n.toString(32)),
                  (t += ':');
              } else t = ':' + t + 'r' + (n = po++).toString(32) + ':';
              return (e.memoizedState = t);
            },
            unstable_isNewReconciler: !1,
          },
          ei = {
            readContext: Pl,
            useCallback: Ho,
            useContext: Pl,
            useEffect: Mo,
            useImperativeHandle: Bo,
            useInsertionEffect: Do,
            useLayoutEffect: Fo,
            useMemo: Uo,
            useReducer: wo,
            useRef: zo,
            useState: function () {
              return wo(ko);
            },
            useDebugValue: Vo,
            useDeferredValue: function (e) {
              return Wo(bo(), io.memoizedState, e);
            },
            useTransition: function () {
              return [wo(ko)[0], bo().memoizedState];
            },
            useMutableSource: _o,
            useSyncExternalStore: xo,
            useId: Qo,
            unstable_isNewReconciler: !1,
          },
          ti = {
            readContext: Pl,
            useCallback: Ho,
            useContext: Pl,
            useEffect: Mo,
            useImperativeHandle: Bo,
            useInsertionEffect: Do,
            useLayoutEffect: Fo,
            useMemo: Uo,
            useReducer: So,
            useRef: zo,
            useState: function () {
              return So(ko);
            },
            useDebugValue: Vo,
            useDeferredValue: function (e) {
              var t = bo();
              return null === io
                ? (t.memoizedState = e)
                : Wo(t, io.memoizedState, e);
            },
            useTransition: function () {
              return [So(ko)[0], bo().memoizedState];
            },
            useMutableSource: _o,
            useSyncExternalStore: xo,
            useId: Qo,
            unstable_isNewReconciler: !1,
          };
        function ni(e, t) {
          if (e && e.defaultProps) {
            for (var n in ((t = D({}, t)), (e = e.defaultProps)))
              void 0 === t[n] && (t[n] = e[n]);
            return t;
          }
          return t;
        }
        function ri(e, t, n, r) {
          (n =
            null === (n = n(r, (t = e.memoizedState))) || void 0 === n
              ? t
              : D({}, t, n)),
            (e.memoizedState = n),
            0 === e.lanes && (e.updateQueue.baseState = n);
        }
        var ai = {
          isMounted: function (e) {
            return !!(e = e._reactInternals) && He(e) === e;
          },
          enqueueSetState: function (e, t, n) {
            e = e._reactInternals;
            var r = es(),
              a = ts(e),
              l = Fl(r, a);
            (l.payload = t),
              void 0 !== n && null !== n && (l.callback = n),
              null !== (t = Il(e, l, a)) && (ns(t, e, a, r), Bl(t, e, a));
          },
          enqueueReplaceState: function (e, t, n) {
            e = e._reactInternals;
            var r = es(),
              a = ts(e),
              l = Fl(r, a);
            (l.tag = 1),
              (l.payload = t),
              void 0 !== n && null !== n && (l.callback = n),
              null !== (t = Il(e, l, a)) && (ns(t, e, a, r), Bl(t, e, a));
          },
          enqueueForceUpdate: function (e, t) {
            e = e._reactInternals;
            var n = es(),
              r = ts(e),
              a = Fl(n, r);
            (a.tag = 2),
              void 0 !== t && null !== t && (a.callback = t),
              null !== (t = Il(e, a, r)) && (ns(t, e, r, n), Bl(t, e, r));
          },
        };
        function li(e, t, n, r, a, l, o) {
          return 'function' === typeof (e = e.stateNode).shouldComponentUpdate
            ? e.shouldComponentUpdate(r, l, o)
            : !t.prototype ||
                !t.prototype.isPureReactComponent ||
                !ur(n, r) ||
                !ur(a, l);
        }
        function oi(e, t, n) {
          var r = !1,
            a = Na,
            l = t.contextType;
          return (
            'object' === typeof l && null !== l
              ? (l = Pl(l))
              : ((a = za(t) ? Pa : La.current),
                (l = (r = null !== (r = t.contextTypes) && void 0 !== r)
                  ? Aa(e, a)
                  : Na)),
            (t = new t(n, l)),
            (e.memoizedState =
              null !== t.state && void 0 !== t.state ? t.state : null),
            (t.updater = ai),
            (e.stateNode = t),
            (t._reactInternals = e),
            r &&
              (((e = e.stateNode).__reactInternalMemoizedUnmaskedChildContext =
                a),
              (e.__reactInternalMemoizedMaskedChildContext = l)),
            t
          );
        }
        function ii(e, t, n, r) {
          (e = t.state),
            'function' === typeof t.componentWillReceiveProps &&
              t.componentWillReceiveProps(n, r),
            'function' === typeof t.UNSAFE_componentWillReceiveProps &&
              t.UNSAFE_componentWillReceiveProps(n, r),
            t.state !== e && ai.enqueueReplaceState(t, t.state, null);
        }
        function ui(e, t, n, r) {
          var a = e.stateNode;
          (a.props = n), (a.state = e.memoizedState), (a.refs = {}), Ml(e);
          var l = t.contextType;
          'object' === typeof l && null !== l
            ? (a.context = Pl(l))
            : ((l = za(t) ? Pa : La.current), (a.context = Aa(e, l))),
            (a.state = e.memoizedState),
            'function' === typeof (l = t.getDerivedStateFromProps) &&
              (ri(e, t, l, n), (a.state = e.memoizedState)),
            'function' === typeof t.getDerivedStateFromProps ||
              'function' === typeof a.getSnapshotBeforeUpdate ||
              ('function' !== typeof a.UNSAFE_componentWillMount &&
                'function' !== typeof a.componentWillMount) ||
              ((t = a.state),
              'function' === typeof a.componentWillMount &&
                a.componentWillMount(),
              'function' === typeof a.UNSAFE_componentWillMount &&
                a.UNSAFE_componentWillMount(),
              t !== a.state && ai.enqueueReplaceState(a, a.state, null),
              Hl(e, n, a, r),
              (a.state = e.memoizedState)),
            'function' === typeof a.componentDidMount && (e.flags |= 4194308);
        }
        function si(e, t) {
          try {
            var n = '',
              r = t;
            do {
              (n += V(r)), (r = r.return);
            } while (r);
            var a = n;
          } catch (l) {
            a = '\nError generating stack: ' + l.message + '\n' + l.stack;
          }
          return { value: e, source: t, stack: a, digest: null };
        }
        function ci(e, t, n) {
          return {
            value: e,
            source: null,
            stack: null != n ? n : null,
            digest: null != t ? t : null,
          };
        }
        function di(e, t) {
          try {
            console.error(t.value);
          } catch (n) {
            setTimeout(function () {
              throw n;
            });
          }
        }
        var fi = 'function' === typeof WeakMap ? WeakMap : Map;
        function pi(e, t, n) {
          ((n = Fl(-1, n)).tag = 3), (n.payload = { element: null });
          var r = t.value;
          return (
            (n.callback = function () {
              Wu || ((Wu = !0), (qu = r)), di(0, t);
            }),
            n
          );
        }
        function hi(e, t, n) {
          (n = Fl(-1, n)).tag = 3;
          var r = e.type.getDerivedStateFromError;
          if ('function' === typeof r) {
            var a = t.value;
            (n.payload = function () {
              return r(a);
            }),
              (n.callback = function () {
                di(0, t);
              });
          }
          var l = e.stateNode;
          return (
            null !== l &&
              'function' === typeof l.componentDidCatch &&
              (n.callback = function () {
                di(0, t),
                  'function' !== typeof r &&
                    (null === Qu ? (Qu = new Set([this])) : Qu.add(this));
                var e = t.stack;
                this.componentDidCatch(t.value, {
                  componentStack: null !== e ? e : '',
                });
              }),
            n
          );
        }
        function mi(e, t, n) {
          var r = e.pingCache;
          if (null === r) {
            r = e.pingCache = new fi();
            var a = new Set();
            r.set(t, a);
          } else void 0 === (a = r.get(t)) && ((a = new Set()), r.set(t, a));
          a.has(n) || (a.add(n), (e = Es.bind(null, e, t, n)), t.then(e, e));
        }
        function gi(e) {
          do {
            var t;
            if (
              ((t = 13 === e.tag) &&
                (t = null === (t = e.memoizedState) || null !== t.dehydrated),
              t)
            )
              return e;
            e = e.return;
          } while (null !== e);
          return null;
        }
        function vi(e, t, n, r, a) {
          return 0 === (1 & e.mode)
            ? (e === t
                ? (e.flags |= 65536)
                : ((e.flags |= 128),
                  (n.flags |= 131072),
                  (n.flags &= -52805),
                  1 === n.tag &&
                    (null === n.alternate
                      ? (n.tag = 17)
                      : (((t = Fl(-1, 1)).tag = 2), Il(n, t, 1))),
                  (n.lanes |= 1)),
              e)
            : ((e.flags |= 65536), (e.lanes = a), e);
        }
        var yi = k.ReactCurrentOwner,
          bi = !1;
        function ki(e, t, n, r) {
          t.child = null === e ? wl(t, null, n, r) : kl(t, e.child, n, r);
        }
        function wi(e, t, n, r, a) {
          n = n.render;
          var l = t.ref;
          return (
            Tl(t, a),
            (r = go(e, t, n, r, l, a)),
            (n = vo()),
            null === e || bi
              ? (al && n && el(t), (t.flags |= 1), ki(e, t, r, a), t.child)
              : ((t.updateQueue = e.updateQueue),
                (t.flags &= -2053),
                (e.lanes &= ~a),
                Wi(e, t, a))
          );
        }
        function Si(e, t, n, r, a) {
          if (null === e) {
            var l = n.type;
            return 'function' !== typeof l ||
              zs(l) ||
              void 0 !== l.defaultProps ||
              null !== n.compare ||
              void 0 !== n.defaultProps
              ? (((e = Os(n.type, null, r, t, t.mode, a)).ref = t.ref),
                (e.return = t),
                (t.child = e))
              : ((t.tag = 15), (t.type = l), _i(e, t, l, r, a));
          }
          if (((l = e.child), 0 === (e.lanes & a))) {
            var o = l.memoizedProps;
            if (
              (n = null !== (n = n.compare) ? n : ur)(o, r) &&
              e.ref === t.ref
            )
              return Wi(e, t, a);
          }
          return (
            (t.flags |= 1),
            ((e = js(l, r)).ref = t.ref),
            (e.return = t),
            (t.child = e)
          );
        }
        function _i(e, t, n, r, a) {
          if (null !== e) {
            var l = e.memoizedProps;
            if (ur(l, r) && e.ref === t.ref) {
              if (((bi = !1), (t.pendingProps = r = l), 0 === (e.lanes & a)))
                return (t.lanes = e.lanes), Wi(e, t, a);
              0 !== (131072 & e.flags) && (bi = !0);
            }
          }
          return Ci(e, t, n, r, a);
        }
        function xi(e, t, n) {
          var r = t.pendingProps,
            a = r.children,
            l = null !== e ? e.memoizedState : null;
          if ('hidden' === r.mode)
            if (0 === (1 & t.mode))
              (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
              }),
                Ca(ju, zu),
                (zu |= n);
            else {
              if (0 === (1073741824 & n))
                return (
                  (e = null !== l ? l.baseLanes | n : n),
                  (t.lanes = t.childLanes = 1073741824),
                  (t.memoizedState = {
                    baseLanes: e,
                    cachePool: null,
                    transitions: null,
                  }),
                  (t.updateQueue = null),
                  Ca(ju, zu),
                  (zu |= e),
                  null
                );
              (t.memoizedState = {
                baseLanes: 0,
                cachePool: null,
                transitions: null,
              }),
                (r = null !== l ? l.baseLanes : n),
                Ca(ju, zu),
                (zu |= r);
            }
          else
            null !== l
              ? ((r = l.baseLanes | n), (t.memoizedState = null))
              : (r = n),
              Ca(ju, zu),
              (zu |= r);
          return ki(e, t, a, n), t.child;
        }
        function Ei(e, t) {
          var n = t.ref;
          ((null === e && null !== n) || (null !== e && e.ref !== n)) &&
            ((t.flags |= 512), (t.flags |= 2097152));
        }
        function Ci(e, t, n, r, a) {
          var l = za(n) ? Pa : La.current;
          return (
            (l = Aa(t, l)),
            Tl(t, a),
            (n = go(e, t, n, r, l, a)),
            (r = vo()),
            null === e || bi
              ? (al && r && el(t), (t.flags |= 1), ki(e, t, n, a), t.child)
              : ((t.updateQueue = e.updateQueue),
                (t.flags &= -2053),
                (e.lanes &= ~a),
                Wi(e, t, a))
          );
        }
        function Ni(e, t, n, r, a) {
          if (za(n)) {
            var l = !0;
            Ma(t);
          } else l = !1;
          if ((Tl(t, a), null === t.stateNode))
            Ui(e, t), oi(t, n, r), ui(t, n, r, a), (r = !0);
          else if (null === e) {
            var o = t.stateNode,
              i = t.memoizedProps;
            o.props = i;
            var u = o.context,
              s = n.contextType;
            'object' === typeof s && null !== s
              ? (s = Pl(s))
              : (s = Aa(t, (s = za(n) ? Pa : La.current)));
            var c = n.getDerivedStateFromProps,
              d =
                'function' === typeof c ||
                'function' === typeof o.getSnapshotBeforeUpdate;
            d ||
              ('function' !== typeof o.UNSAFE_componentWillReceiveProps &&
                'function' !== typeof o.componentWillReceiveProps) ||
              ((i !== r || u !== s) && ii(t, o, r, s)),
              (Rl = !1);
            var f = t.memoizedState;
            (o.state = f),
              Hl(t, r, o, a),
              (u = t.memoizedState),
              i !== r || f !== u || Ta.current || Rl
                ? ('function' === typeof c &&
                    (ri(t, n, c, r), (u = t.memoizedState)),
                  (i = Rl || li(t, n, i, r, f, u, s))
                    ? (d ||
                        ('function' !== typeof o.UNSAFE_componentWillMount &&
                          'function' !== typeof o.componentWillMount) ||
                        ('function' === typeof o.componentWillMount &&
                          o.componentWillMount(),
                        'function' === typeof o.UNSAFE_componentWillMount &&
                          o.UNSAFE_componentWillMount()),
                      'function' === typeof o.componentDidMount &&
                        (t.flags |= 4194308))
                    : ('function' === typeof o.componentDidMount &&
                        (t.flags |= 4194308),
                      (t.memoizedProps = r),
                      (t.memoizedState = u)),
                  (o.props = r),
                  (o.state = u),
                  (o.context = s),
                  (r = i))
                : ('function' === typeof o.componentDidMount &&
                    (t.flags |= 4194308),
                  (r = !1));
          } else {
            (o = t.stateNode),
              Dl(e, t),
              (i = t.memoizedProps),
              (s = t.type === t.elementType ? i : ni(t.type, i)),
              (o.props = s),
              (d = t.pendingProps),
              (f = o.context),
              'object' === typeof (u = n.contextType) && null !== u
                ? (u = Pl(u))
                : (u = Aa(t, (u = za(n) ? Pa : La.current)));
            var p = n.getDerivedStateFromProps;
            (c =
              'function' === typeof p ||
              'function' === typeof o.getSnapshotBeforeUpdate) ||
              ('function' !== typeof o.UNSAFE_componentWillReceiveProps &&
                'function' !== typeof o.componentWillReceiveProps) ||
              ((i !== d || f !== u) && ii(t, o, r, u)),
              (Rl = !1),
              (f = t.memoizedState),
              (o.state = f),
              Hl(t, r, o, a);
            var h = t.memoizedState;
            i !== d || f !== h || Ta.current || Rl
              ? ('function' === typeof p &&
                  (ri(t, n, p, r), (h = t.memoizedState)),
                (s = Rl || li(t, n, s, r, f, h, u) || !1)
                  ? (c ||
                      ('function' !== typeof o.UNSAFE_componentWillUpdate &&
                        'function' !== typeof o.componentWillUpdate) ||
                      ('function' === typeof o.componentWillUpdate &&
                        o.componentWillUpdate(r, h, u),
                      'function' === typeof o.UNSAFE_componentWillUpdate &&
                        o.UNSAFE_componentWillUpdate(r, h, u)),
                    'function' === typeof o.componentDidUpdate &&
                      (t.flags |= 4),
                    'function' === typeof o.getSnapshotBeforeUpdate &&
                      (t.flags |= 1024))
                  : ('function' !== typeof o.componentDidUpdate ||
                      (i === e.memoizedProps && f === e.memoizedState) ||
                      (t.flags |= 4),
                    'function' !== typeof o.getSnapshotBeforeUpdate ||
                      (i === e.memoizedProps && f === e.memoizedState) ||
                      (t.flags |= 1024),
                    (t.memoizedProps = r),
                    (t.memoizedState = h)),
                (o.props = r),
                (o.state = h),
                (o.context = u),
                (r = s))
              : ('function' !== typeof o.componentDidUpdate ||
                  (i === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 4),
                'function' !== typeof o.getSnapshotBeforeUpdate ||
                  (i === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 1024),
                (r = !1));
          }
          return Li(e, t, n, r, l, a);
        }
        function Li(e, t, n, r, a, l) {
          Ei(e, t);
          var o = 0 !== (128 & t.flags);
          if (!r && !o) return a && Da(t, n, !1), Wi(e, t, l);
          (r = t.stateNode), (yi.current = t);
          var i =
            o && 'function' !== typeof n.getDerivedStateFromError
              ? null
              : r.render();
          return (
            (t.flags |= 1),
            null !== e && o
              ? ((t.child = kl(t, e.child, null, l)),
                (t.child = kl(t, null, i, l)))
              : ki(e, t, i, l),
            (t.memoizedState = r.state),
            a && Da(t, n, !0),
            t.child
          );
        }
        function Ti(e) {
          var t = e.stateNode;
          t.pendingContext
            ? Oa(0, t.pendingContext, t.pendingContext !== t.context)
            : t.context && Oa(0, t.context, !1),
            Zl(e, t.containerInfo);
        }
        function Pi(e, t, n, r, a) {
          return pl(), hl(a), (t.flags |= 256), ki(e, t, n, r), t.child;
        }
        var Ai,
          zi,
          ji,
          Oi,
          Ri = { dehydrated: null, treeContext: null, retryLane: 0 };
        function Mi(e) {
          return { baseLanes: e, cachePool: null, transitions: null };
        }
        function Di(e, t, n) {
          var r,
            a = t.pendingProps,
            o = $l.current,
            i = !1,
            u = 0 !== (128 & t.flags);
          if (
            ((r = u) ||
              (r = (null === e || null !== e.memoizedState) && 0 !== (2 & o)),
            r
              ? ((i = !0), (t.flags &= -129))
              : (null !== e && null === e.memoizedState) || (o |= 1),
            Ca($l, 1 & o),
            null === e)
          )
            return (
              sl(t),
              null !== (e = t.memoizedState) && null !== (e = e.dehydrated)
                ? (0 === (1 & t.mode)
                    ? (t.lanes = 1)
                    : '$!' === e.data
                    ? (t.lanes = 8)
                    : (t.lanes = 1073741824),
                  null)
                : ((u = a.children),
                  (e = a.fallback),
                  i
                    ? ((a = t.mode),
                      (i = t.child),
                      (u = { mode: 'hidden', children: u }),
                      0 === (1 & a) && null !== i
                        ? ((i.childLanes = 0), (i.pendingProps = u))
                        : (i = Ms(u, a, 0, null)),
                      (e = Rs(e, a, n, null)),
                      (i.return = t),
                      (e.return = t),
                      (i.sibling = e),
                      (t.child = i),
                      (t.child.memoizedState = Mi(n)),
                      (t.memoizedState = Ri),
                      e)
                    : Fi(t, u))
            );
          if (null !== (o = e.memoizedState) && null !== (r = o.dehydrated))
            return (function (e, t, n, r, a, o, i) {
              if (n)
                return 256 & t.flags
                  ? ((t.flags &= -257), Ii(e, t, i, (r = ci(Error(l(422))))))
                  : null !== t.memoizedState
                  ? ((t.child = e.child), (t.flags |= 128), null)
                  : ((o = r.fallback),
                    (a = t.mode),
                    (r = Ms(
                      { mode: 'visible', children: r.children },
                      a,
                      0,
                      null
                    )),
                    ((o = Rs(o, a, i, null)).flags |= 2),
                    (r.return = t),
                    (o.return = t),
                    (r.sibling = o),
                    (t.child = r),
                    0 !== (1 & t.mode) && kl(t, e.child, null, i),
                    (t.child.memoizedState = Mi(i)),
                    (t.memoizedState = Ri),
                    o);
              if (0 === (1 & t.mode)) return Ii(e, t, i, null);
              if ('$!' === a.data) {
                if ((r = a.nextSibling && a.nextSibling.dataset))
                  var u = r.dgst;
                return (
                  (r = u), Ii(e, t, i, (r = ci((o = Error(l(419))), r, void 0)))
                );
              }
              if (((u = 0 !== (i & e.childLanes)), bi || u)) {
                if (null !== (r = Tu)) {
                  switch (i & -i) {
                    case 4:
                      a = 2;
                      break;
                    case 16:
                      a = 8;
                      break;
                    case 64:
                    case 128:
                    case 256:
                    case 512:
                    case 1024:
                    case 2048:
                    case 4096:
                    case 8192:
                    case 16384:
                    case 32768:
                    case 65536:
                    case 131072:
                    case 262144:
                    case 524288:
                    case 1048576:
                    case 2097152:
                    case 4194304:
                    case 8388608:
                    case 16777216:
                    case 33554432:
                    case 67108864:
                      a = 32;
                      break;
                    case 536870912:
                      a = 268435456;
                      break;
                    default:
                      a = 0;
                  }
                  0 !== (a = 0 !== (a & (r.suspendedLanes | i)) ? 0 : a) &&
                    a !== o.retryLane &&
                    ((o.retryLane = a), Ol(e, a), ns(r, e, a, -1));
                }
                return ms(), Ii(e, t, i, (r = ci(Error(l(421)))));
              }
              return '$?' === a.data
                ? ((t.flags |= 128),
                  (t.child = e.child),
                  (t = Ns.bind(null, e)),
                  (a._reactRetry = t),
                  null)
                : ((e = o.treeContext),
                  (rl = sa(a.nextSibling)),
                  (nl = t),
                  (al = !0),
                  (ll = null),
                  null !== e &&
                    ((Ja[Ka++] = Ga),
                    (Ja[Ka++] = Xa),
                    (Ja[Ka++] = Za),
                    (Ga = e.id),
                    (Xa = e.overflow),
                    (Za = t)),
                  (t = Fi(t, r.children)),
                  (t.flags |= 4096),
                  t);
            })(e, t, u, a, r, o, n);
          if (i) {
            (i = a.fallback), (u = t.mode), (r = (o = e.child).sibling);
            var s = { mode: 'hidden', children: a.children };
            return (
              0 === (1 & u) && t.child !== o
                ? (((a = t.child).childLanes = 0),
                  (a.pendingProps = s),
                  (t.deletions = null))
                : ((a = js(o, s)).subtreeFlags = 14680064 & o.subtreeFlags),
              null !== r
                ? (i = js(r, i))
                : ((i = Rs(i, u, n, null)).flags |= 2),
              (i.return = t),
              (a.return = t),
              (a.sibling = i),
              (t.child = a),
              (a = i),
              (i = t.child),
              (u =
                null === (u = e.child.memoizedState)
                  ? Mi(n)
                  : {
                      baseLanes: u.baseLanes | n,
                      cachePool: null,
                      transitions: u.transitions,
                    }),
              (i.memoizedState = u),
              (i.childLanes = e.childLanes & ~n),
              (t.memoizedState = Ri),
              a
            );
          }
          return (
            (e = (i = e.child).sibling),
            (a = js(i, { mode: 'visible', children: a.children })),
            0 === (1 & t.mode) && (a.lanes = n),
            (a.return = t),
            (a.sibling = null),
            null !== e &&
              (null === (n = t.deletions)
                ? ((t.deletions = [e]), (t.flags |= 16))
                : n.push(e)),
            (t.child = a),
            (t.memoizedState = null),
            a
          );
        }
        function Fi(e, t) {
          return (
            ((t = Ms(
              { mode: 'visible', children: t },
              e.mode,
              0,
              null
            )).return = e),
            (e.child = t)
          );
        }
        function Ii(e, t, n, r) {
          return (
            null !== r && hl(r),
            kl(t, e.child, null, n),
            ((e = Fi(t, t.pendingProps.children)).flags |= 2),
            (t.memoizedState = null),
            e
          );
        }
        function Bi(e, t, n) {
          e.lanes |= t;
          var r = e.alternate;
          null !== r && (r.lanes |= t), Ll(e.return, t, n);
        }
        function Vi(e, t, n, r, a) {
          var l = e.memoizedState;
          null === l
            ? (e.memoizedState = {
                isBackwards: t,
                rendering: null,
                renderingStartTime: 0,
                last: r,
                tail: n,
                tailMode: a,
              })
            : ((l.isBackwards = t),
              (l.rendering = null),
              (l.renderingStartTime = 0),
              (l.last = r),
              (l.tail = n),
              (l.tailMode = a));
        }
        function Hi(e, t, n) {
          var r = t.pendingProps,
            a = r.revealOrder,
            l = r.tail;
          if ((ki(e, t, r.children, n), 0 !== (2 & (r = $l.current))))
            (r = (1 & r) | 2), (t.flags |= 128);
          else {
            if (null !== e && 0 !== (128 & e.flags))
              e: for (e = t.child; null !== e; ) {
                if (13 === e.tag) null !== e.memoizedState && Bi(e, n, t);
                else if (19 === e.tag) Bi(e, n, t);
                else if (null !== e.child) {
                  (e.child.return = e), (e = e.child);
                  continue;
                }
                if (e === t) break e;
                for (; null === e.sibling; ) {
                  if (null === e.return || e.return === t) break e;
                  e = e.return;
                }
                (e.sibling.return = e.return), (e = e.sibling);
              }
            r &= 1;
          }
          if ((Ca($l, r), 0 === (1 & t.mode))) t.memoizedState = null;
          else
            switch (a) {
              case 'forwards':
                for (n = t.child, a = null; null !== n; )
                  null !== (e = n.alternate) && null === eo(e) && (a = n),
                    (n = n.sibling);
                null === (n = a)
                  ? ((a = t.child), (t.child = null))
                  : ((a = n.sibling), (n.sibling = null)),
                  Vi(t, !1, a, n, l);
                break;
              case 'backwards':
                for (n = null, a = t.child, t.child = null; null !== a; ) {
                  if (null !== (e = a.alternate) && null === eo(e)) {
                    t.child = a;
                    break;
                  }
                  (e = a.sibling), (a.sibling = n), (n = a), (a = e);
                }
                Vi(t, !0, n, null, l);
                break;
              case 'together':
                Vi(t, !1, null, null, void 0);
                break;
              default:
                t.memoizedState = null;
            }
          return t.child;
        }
        function Ui(e, t) {
          0 === (1 & t.mode) &&
            null !== e &&
            ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
        }
        function Wi(e, t, n) {
          if (
            (null !== e && (t.dependencies = e.dependencies),
            (Mu |= t.lanes),
            0 === (n & t.childLanes))
          )
            return null;
          if (null !== e && t.child !== e.child) throw Error(l(153));
          if (null !== t.child) {
            for (
              n = js((e = t.child), e.pendingProps), t.child = n, n.return = t;
              null !== e.sibling;

            )
              (e = e.sibling),
                ((n = n.sibling = js(e, e.pendingProps)).return = t);
            n.sibling = null;
          }
          return t.child;
        }
        function qi(e, t) {
          if (!al)
            switch (e.tailMode) {
              case 'hidden':
                t = e.tail;
                for (var n = null; null !== t; )
                  null !== t.alternate && (n = t), (t = t.sibling);
                null === n ? (e.tail = null) : (n.sibling = null);
                break;
              case 'collapsed':
                n = e.tail;
                for (var r = null; null !== n; )
                  null !== n.alternate && (r = n), (n = n.sibling);
                null === r
                  ? t || null === e.tail
                    ? (e.tail = null)
                    : (e.tail.sibling = null)
                  : (r.sibling = null);
            }
        }
        function Qi(e) {
          var t = null !== e.alternate && e.alternate.child === e.child,
            n = 0,
            r = 0;
          if (t)
            for (var a = e.child; null !== a; )
              (n |= a.lanes | a.childLanes),
                (r |= 14680064 & a.subtreeFlags),
                (r |= 14680064 & a.flags),
                (a.return = e),
                (a = a.sibling);
          else
            for (a = e.child; null !== a; )
              (n |= a.lanes | a.childLanes),
                (r |= a.subtreeFlags),
                (r |= a.flags),
                (a.return = e),
                (a = a.sibling);
          return (e.subtreeFlags |= r), (e.childLanes = n), t;
        }
        function Ji(e, t, n) {
          var r = t.pendingProps;
          switch ((tl(t), t.tag)) {
            case 2:
            case 16:
            case 15:
            case 0:
            case 11:
            case 7:
            case 8:
            case 12:
            case 9:
            case 14:
              return Qi(t), null;
            case 1:
            case 17:
              return za(t.type) && ja(), Qi(t), null;
            case 3:
              return (
                (r = t.stateNode),
                Gl(),
                Ea(Ta),
                Ea(La),
                no(),
                r.pendingContext &&
                  ((r.context = r.pendingContext), (r.pendingContext = null)),
                (null !== e && null !== e.child) ||
                  (dl(t)
                    ? (t.flags |= 4)
                    : null === e ||
                      (e.memoizedState.isDehydrated && 0 === (256 & t.flags)) ||
                      ((t.flags |= 1024),
                      null !== ll && (os(ll), (ll = null)))),
                zi(e, t),
                Qi(t),
                null
              );
            case 5:
              Yl(t);
              var a = Kl(Jl.current);
              if (((n = t.type), null !== e && null != t.stateNode))
                ji(e, t, n, r, a),
                  e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
              else {
                if (!r) {
                  if (null === t.stateNode) throw Error(l(166));
                  return Qi(t), null;
                }
                if (((e = Kl(ql.current)), dl(t))) {
                  (r = t.stateNode), (n = t.type);
                  var o = t.memoizedProps;
                  switch (
                    ((r[fa] = t), (r[pa] = o), (e = 0 !== (1 & t.mode)), n)
                  ) {
                    case 'dialog':
                      Ir('cancel', r), Ir('close', r);
                      break;
                    case 'iframe':
                    case 'object':
                    case 'embed':
                      Ir('load', r);
                      break;
                    case 'video':
                    case 'audio':
                      for (a = 0; a < Rr.length; a++) Ir(Rr[a], r);
                      break;
                    case 'source':
                      Ir('error', r);
                      break;
                    case 'img':
                    case 'image':
                    case 'link':
                      Ir('error', r), Ir('load', r);
                      break;
                    case 'details':
                      Ir('toggle', r);
                      break;
                    case 'input':
                      G(r, o), Ir('invalid', r);
                      break;
                    case 'select':
                      (r._wrapperState = { wasMultiple: !!o.multiple }),
                        Ir('invalid', r);
                      break;
                    case 'textarea':
                      ae(r, o), Ir('invalid', r);
                  }
                  for (var u in (ye(n, o), (a = null), o))
                    if (o.hasOwnProperty(u)) {
                      var s = o[u];
                      'children' === u
                        ? 'string' === typeof s
                          ? r.textContent !== s &&
                            (!0 !== o.suppressHydrationWarning &&
                              Yr(r.textContent, s, e),
                            (a = ['children', s]))
                          : 'number' === typeof s &&
                            r.textContent !== '' + s &&
                            (!0 !== o.suppressHydrationWarning &&
                              Yr(r.textContent, s, e),
                            (a = ['children', '' + s]))
                        : i.hasOwnProperty(u) &&
                          null != s &&
                          'onScroll' === u &&
                          Ir('scroll', r);
                    }
                  switch (n) {
                    case 'input':
                      Q(r), $(r, o, !0);
                      break;
                    case 'textarea':
                      Q(r), oe(r);
                      break;
                    case 'select':
                    case 'option':
                      break;
                    default:
                      'function' === typeof o.onClick && (r.onclick = $r);
                  }
                  (r = a), (t.updateQueue = r), null !== r && (t.flags |= 4);
                } else {
                  (u = 9 === a.nodeType ? a : a.ownerDocument),
                    'http://www.w3.org/1999/xhtml' === e && (e = ie(n)),
                    'http://www.w3.org/1999/xhtml' === e
                      ? 'script' === n
                        ? (((e = u.createElement('div')).innerHTML =
                            '<script></script>'),
                          (e = e.removeChild(e.firstChild)))
                        : 'string' === typeof r.is
                        ? (e = u.createElement(n, { is: r.is }))
                        : ((e = u.createElement(n)),
                          'select' === n &&
                            ((u = e),
                            r.multiple
                              ? (u.multiple = !0)
                              : r.size && (u.size = r.size)))
                      : (e = u.createElementNS(e, n)),
                    (e[fa] = t),
                    (e[pa] = r),
                    Ai(e, t, !1, !1),
                    (t.stateNode = e);
                  e: {
                    switch (((u = be(n, r)), n)) {
                      case 'dialog':
                        Ir('cancel', e), Ir('close', e), (a = r);
                        break;
                      case 'iframe':
                      case 'object':
                      case 'embed':
                        Ir('load', e), (a = r);
                        break;
                      case 'video':
                      case 'audio':
                        for (a = 0; a < Rr.length; a++) Ir(Rr[a], e);
                        a = r;
                        break;
                      case 'source':
                        Ir('error', e), (a = r);
                        break;
                      case 'img':
                      case 'image':
                      case 'link':
                        Ir('error', e), Ir('load', e), (a = r);
                        break;
                      case 'details':
                        Ir('toggle', e), (a = r);
                        break;
                      case 'input':
                        G(e, r), (a = Z(e, r)), Ir('invalid', e);
                        break;
                      case 'option':
                      default:
                        a = r;
                        break;
                      case 'select':
                        (e._wrapperState = { wasMultiple: !!r.multiple }),
                          (a = D({}, r, { value: void 0 })),
                          Ir('invalid', e);
                        break;
                      case 'textarea':
                        ae(e, r), (a = re(e, r)), Ir('invalid', e);
                    }
                    for (o in (ye(n, a), (s = a)))
                      if (s.hasOwnProperty(o)) {
                        var c = s[o];
                        'style' === o
                          ? ge(e, c)
                          : 'dangerouslySetInnerHTML' === o
                          ? null != (c = c ? c.__html : void 0) && de(e, c)
                          : 'children' === o
                          ? 'string' === typeof c
                            ? ('textarea' !== n || '' !== c) && fe(e, c)
                            : 'number' === typeof c && fe(e, '' + c)
                          : 'suppressContentEditableWarning' !== o &&
                            'suppressHydrationWarning' !== o &&
                            'autoFocus' !== o &&
                            (i.hasOwnProperty(o)
                              ? null != c && 'onScroll' === o && Ir('scroll', e)
                              : null != c && b(e, o, c, u));
                      }
                    switch (n) {
                      case 'input':
                        Q(e), $(e, r, !1);
                        break;
                      case 'textarea':
                        Q(e), oe(e);
                        break;
                      case 'option':
                        null != r.value &&
                          e.setAttribute('value', '' + W(r.value));
                        break;
                      case 'select':
                        (e.multiple = !!r.multiple),
                          null != (o = r.value)
                            ? ne(e, !!r.multiple, o, !1)
                            : null != r.defaultValue &&
                              ne(e, !!r.multiple, r.defaultValue, !0);
                        break;
                      default:
                        'function' === typeof a.onClick && (e.onclick = $r);
                    }
                    switch (n) {
                      case 'button':
                      case 'input':
                      case 'select':
                      case 'textarea':
                        r = !!r.autoFocus;
                        break e;
                      case 'img':
                        r = !0;
                        break e;
                      default:
                        r = !1;
                    }
                  }
                  r && (t.flags |= 4);
                }
                null !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
              }
              return Qi(t), null;
            case 6:
              if (e && null != t.stateNode) Oi(e, t, e.memoizedProps, r);
              else {
                if ('string' !== typeof r && null === t.stateNode)
                  throw Error(l(166));
                if (((n = Kl(Jl.current)), Kl(ql.current), dl(t))) {
                  if (
                    ((r = t.stateNode),
                    (n = t.memoizedProps),
                    (r[fa] = t),
                    (o = r.nodeValue !== n) && null !== (e = nl))
                  )
                    switch (e.tag) {
                      case 3:
                        Yr(r.nodeValue, n, 0 !== (1 & e.mode));
                        break;
                      case 5:
                        !0 !== e.memoizedProps.suppressHydrationWarning &&
                          Yr(r.nodeValue, n, 0 !== (1 & e.mode));
                    }
                  o && (t.flags |= 4);
                } else
                  ((r = (9 === n.nodeType ? n : n.ownerDocument).createTextNode(
                    r
                  ))[fa] = t),
                    (t.stateNode = r);
              }
              return Qi(t), null;
            case 13:
              if (
                (Ea($l),
                (r = t.memoizedState),
                null === e ||
                  (null !== e.memoizedState &&
                    null !== e.memoizedState.dehydrated))
              ) {
                if (
                  al &&
                  null !== rl &&
                  0 !== (1 & t.mode) &&
                  0 === (128 & t.flags)
                )
                  fl(), pl(), (t.flags |= 98560), (o = !1);
                else if (((o = dl(t)), null !== r && null !== r.dehydrated)) {
                  if (null === e) {
                    if (!o) throw Error(l(318));
                    if (
                      !(o =
                        null !== (o = t.memoizedState) ? o.dehydrated : null)
                    )
                      throw Error(l(317));
                    o[fa] = t;
                  } else
                    pl(),
                      0 === (128 & t.flags) && (t.memoizedState = null),
                      (t.flags |= 4);
                  Qi(t), (o = !1);
                } else null !== ll && (os(ll), (ll = null)), (o = !0);
                if (!o) return 65536 & t.flags ? t : null;
              }
              return 0 !== (128 & t.flags)
                ? ((t.lanes = n), t)
                : ((r = null !== r) !==
                    (null !== e && null !== e.memoizedState) &&
                    r &&
                    ((t.child.flags |= 8192),
                    0 !== (1 & t.mode) &&
                      (null === e || 0 !== (1 & $l.current)
                        ? 0 === Ou && (Ou = 3)
                        : ms())),
                  null !== t.updateQueue && (t.flags |= 4),
                  Qi(t),
                  null);
            case 4:
              return (
                Gl(),
                zi(e, t),
                null === e && Hr(t.stateNode.containerInfo),
                Qi(t),
                null
              );
            case 10:
              return Nl(t.type._context), Qi(t), null;
            case 19:
              if ((Ea($l), null === (o = t.memoizedState))) return Qi(t), null;
              if (((r = 0 !== (128 & t.flags)), null === (u = o.rendering)))
                if (r) qi(o, !1);
                else {
                  if (0 !== Ou || (null !== e && 0 !== (128 & e.flags)))
                    for (e = t.child; null !== e; ) {
                      if (null !== (u = eo(e))) {
                        for (
                          t.flags |= 128,
                            qi(o, !1),
                            null !== (r = u.updateQueue) &&
                              ((t.updateQueue = r), (t.flags |= 4)),
                            t.subtreeFlags = 0,
                            r = n,
                            n = t.child;
                          null !== n;

                        )
                          (e = r),
                            ((o = n).flags &= 14680066),
                            null === (u = o.alternate)
                              ? ((o.childLanes = 0),
                                (o.lanes = e),
                                (o.child = null),
                                (o.subtreeFlags = 0),
                                (o.memoizedProps = null),
                                (o.memoizedState = null),
                                (o.updateQueue = null),
                                (o.dependencies = null),
                                (o.stateNode = null))
                              : ((o.childLanes = u.childLanes),
                                (o.lanes = u.lanes),
                                (o.child = u.child),
                                (o.subtreeFlags = 0),
                                (o.deletions = null),
                                (o.memoizedProps = u.memoizedProps),
                                (o.memoizedState = u.memoizedState),
                                (o.updateQueue = u.updateQueue),
                                (o.type = u.type),
                                (e = u.dependencies),
                                (o.dependencies =
                                  null === e
                                    ? null
                                    : {
                                        lanes: e.lanes,
                                        firstContext: e.firstContext,
                                      })),
                            (n = n.sibling);
                        return Ca($l, (1 & $l.current) | 2), t.child;
                      }
                      e = e.sibling;
                    }
                  null !== o.tail &&
                    Xe() > Hu &&
                    ((t.flags |= 128),
                    (r = !0),
                    qi(o, !1),
                    (t.lanes = 4194304));
                }
              else {
                if (!r)
                  if (null !== (e = eo(u))) {
                    if (
                      ((t.flags |= 128),
                      (r = !0),
                      null !== (n = e.updateQueue) &&
                        ((t.updateQueue = n), (t.flags |= 4)),
                      qi(o, !0),
                      null === o.tail &&
                        'hidden' === o.tailMode &&
                        !u.alternate &&
                        !al)
                    )
                      return Qi(t), null;
                  } else
                    2 * Xe() - o.renderingStartTime > Hu &&
                      1073741824 !== n &&
                      ((t.flags |= 128),
                      (r = !0),
                      qi(o, !1),
                      (t.lanes = 4194304));
                o.isBackwards
                  ? ((u.sibling = t.child), (t.child = u))
                  : (null !== (n = o.last) ? (n.sibling = u) : (t.child = u),
                    (o.last = u));
              }
              return null !== o.tail
                ? ((t = o.tail),
                  (o.rendering = t),
                  (o.tail = t.sibling),
                  (o.renderingStartTime = Xe()),
                  (t.sibling = null),
                  (n = $l.current),
                  Ca($l, r ? (1 & n) | 2 : 1 & n),
                  t)
                : (Qi(t), null);
            case 22:
            case 23:
              return (
                ds(),
                (r = null !== t.memoizedState),
                null !== e &&
                  (null !== e.memoizedState) !== r &&
                  (t.flags |= 8192),
                r && 0 !== (1 & t.mode)
                  ? 0 !== (1073741824 & zu) &&
                    (Qi(t), 6 & t.subtreeFlags && (t.flags |= 8192))
                  : Qi(t),
                null
              );
            case 24:
            case 25:
              return null;
          }
          throw Error(l(156, t.tag));
        }
        function Ki(e, t) {
          switch ((tl(t), t.tag)) {
            case 1:
              return (
                za(t.type) && ja(),
                65536 & (e = t.flags)
                  ? ((t.flags = (-65537 & e) | 128), t)
                  : null
              );
            case 3:
              return (
                Gl(),
                Ea(Ta),
                Ea(La),
                no(),
                0 !== (65536 & (e = t.flags)) && 0 === (128 & e)
                  ? ((t.flags = (-65537 & e) | 128), t)
                  : null
              );
            case 5:
              return Yl(t), null;
            case 13:
              if (
                (Ea($l),
                null !== (e = t.memoizedState) && null !== e.dehydrated)
              ) {
                if (null === t.alternate) throw Error(l(340));
                pl();
              }
              return 65536 & (e = t.flags)
                ? ((t.flags = (-65537 & e) | 128), t)
                : null;
            case 19:
              return Ea($l), null;
            case 4:
              return Gl(), null;
            case 10:
              return Nl(t.type._context), null;
            case 22:
            case 23:
              return ds(), null;
            default:
              return null;
          }
        }
        (Ai = function (e, t) {
          for (var n = t.child; null !== n; ) {
            if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
            else if (4 !== n.tag && null !== n.child) {
              (n.child.return = n), (n = n.child);
              continue;
            }
            if (n === t) break;
            for (; null === n.sibling; ) {
              if (null === n.return || n.return === t) return;
              n = n.return;
            }
            (n.sibling.return = n.return), (n = n.sibling);
          }
        }),
          (zi = function () {}),
          (ji = function (e, t, n, r) {
            var a = e.memoizedProps;
            if (a !== r) {
              (e = t.stateNode), Kl(ql.current);
              var l,
                o = null;
              switch (n) {
                case 'input':
                  (a = Z(e, a)), (r = Z(e, r)), (o = []);
                  break;
                case 'select':
                  (a = D({}, a, { value: void 0 })),
                    (r = D({}, r, { value: void 0 })),
                    (o = []);
                  break;
                case 'textarea':
                  (a = re(e, a)), (r = re(e, r)), (o = []);
                  break;
                default:
                  'function' !== typeof a.onClick &&
                    'function' === typeof r.onClick &&
                    (e.onclick = $r);
              }
              for (c in (ye(n, r), (n = null), a))
                if (!r.hasOwnProperty(c) && a.hasOwnProperty(c) && null != a[c])
                  if ('style' === c) {
                    var u = a[c];
                    for (l in u)
                      u.hasOwnProperty(l) && (n || (n = {}), (n[l] = ''));
                  } else
                    'dangerouslySetInnerHTML' !== c &&
                      'children' !== c &&
                      'suppressContentEditableWarning' !== c &&
                      'suppressHydrationWarning' !== c &&
                      'autoFocus' !== c &&
                      (i.hasOwnProperty(c)
                        ? o || (o = [])
                        : (o = o || []).push(c, null));
              for (c in r) {
                var s = r[c];
                if (
                  ((u = null != a ? a[c] : void 0),
                  r.hasOwnProperty(c) && s !== u && (null != s || null != u))
                )
                  if ('style' === c)
                    if (u) {
                      for (l in u)
                        !u.hasOwnProperty(l) ||
                          (s && s.hasOwnProperty(l)) ||
                          (n || (n = {}), (n[l] = ''));
                      for (l in s)
                        s.hasOwnProperty(l) &&
                          u[l] !== s[l] &&
                          (n || (n = {}), (n[l] = s[l]));
                    } else n || (o || (o = []), o.push(c, n)), (n = s);
                  else
                    'dangerouslySetInnerHTML' === c
                      ? ((s = s ? s.__html : void 0),
                        (u = u ? u.__html : void 0),
                        null != s && u !== s && (o = o || []).push(c, s))
                      : 'children' === c
                      ? ('string' !== typeof s && 'number' !== typeof s) ||
                        (o = o || []).push(c, '' + s)
                      : 'suppressContentEditableWarning' !== c &&
                        'suppressHydrationWarning' !== c &&
                        (i.hasOwnProperty(c)
                          ? (null != s && 'onScroll' === c && Ir('scroll', e),
                            o || u === s || (o = []))
                          : (o = o || []).push(c, s));
              }
              n && (o = o || []).push('style', n);
              var c = o;
              (t.updateQueue = c) && (t.flags |= 4);
            }
          }),
          (Oi = function (e, t, n, r) {
            n !== r && (t.flags |= 4);
          });
        var Zi = !1,
          Gi = !1,
          Xi = 'function' === typeof WeakSet ? WeakSet : Set,
          Yi = null;
        function $i(e, t) {
          var n = e.ref;
          if (null !== n)
            if ('function' === typeof n)
              try {
                n(null);
              } catch (r) {
                xs(e, t, r);
              }
            else n.current = null;
        }
        function eu(e, t, n) {
          try {
            n();
          } catch (r) {
            xs(e, t, r);
          }
        }
        var tu = !1;
        function nu(e, t, n) {
          var r = t.updateQueue;
          if (null !== (r = null !== r ? r.lastEffect : null)) {
            var a = (r = r.next);
            do {
              if ((a.tag & e) === e) {
                var l = a.destroy;
                (a.destroy = void 0), void 0 !== l && eu(t, n, l);
              }
              a = a.next;
            } while (a !== r);
          }
        }
        function ru(e, t) {
          if (
            null !== (t = null !== (t = t.updateQueue) ? t.lastEffect : null)
          ) {
            var n = (t = t.next);
            do {
              if ((n.tag & e) === e) {
                var r = n.create;
                n.destroy = r();
              }
              n = n.next;
            } while (n !== t);
          }
        }
        function au(e) {
          var t = e.ref;
          if (null !== t) {
            var n = e.stateNode;
            e.tag, (e = n), 'function' === typeof t ? t(e) : (t.current = e);
          }
        }
        function lu(e) {
          var t = e.alternate;
          null !== t && ((e.alternate = null), lu(t)),
            (e.child = null),
            (e.deletions = null),
            (e.sibling = null),
            5 === e.tag &&
              null !== (t = e.stateNode) &&
              (delete t[fa],
              delete t[pa],
              delete t[ma],
              delete t[ga],
              delete t[va]),
            (e.stateNode = null),
            (e.return = null),
            (e.dependencies = null),
            (e.memoizedProps = null),
            (e.memoizedState = null),
            (e.pendingProps = null),
            (e.stateNode = null),
            (e.updateQueue = null);
        }
        function ou(e) {
          return 5 === e.tag || 3 === e.tag || 4 === e.tag;
        }
        function iu(e) {
          e: for (;;) {
            for (; null === e.sibling; ) {
              if (null === e.return || ou(e.return)) return null;
              e = e.return;
            }
            for (
              e.sibling.return = e.return, e = e.sibling;
              5 !== e.tag && 6 !== e.tag && 18 !== e.tag;

            ) {
              if (2 & e.flags) continue e;
              if (null === e.child || 4 === e.tag) continue e;
              (e.child.return = e), (e = e.child);
            }
            if (!(2 & e.flags)) return e.stateNode;
          }
        }
        function uu(e, t, n) {
          var r = e.tag;
          if (5 === r || 6 === r)
            (e = e.stateNode),
              t
                ? 8 === n.nodeType
                  ? n.parentNode.insertBefore(e, t)
                  : n.insertBefore(e, t)
                : (8 === n.nodeType
                    ? (t = n.parentNode).insertBefore(e, n)
                    : (t = n).appendChild(e),
                  (null !== (n = n._reactRootContainer) && void 0 !== n) ||
                    null !== t.onclick ||
                    (t.onclick = $r));
          else if (4 !== r && null !== (e = e.child))
            for (uu(e, t, n), e = e.sibling; null !== e; )
              uu(e, t, n), (e = e.sibling);
        }
        function su(e, t, n) {
          var r = e.tag;
          if (5 === r || 6 === r)
            (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
          else if (4 !== r && null !== (e = e.child))
            for (su(e, t, n), e = e.sibling; null !== e; )
              su(e, t, n), (e = e.sibling);
        }
        var cu = null,
          du = !1;
        function fu(e, t, n) {
          for (n = n.child; null !== n; ) pu(e, t, n), (n = n.sibling);
        }
        function pu(e, t, n) {
          if (lt && 'function' === typeof lt.onCommitFiberUnmount)
            try {
              lt.onCommitFiberUnmount(at, n);
            } catch (i) {}
          switch (n.tag) {
            case 5:
              Gi || $i(n, t);
            case 6:
              var r = cu,
                a = du;
              (cu = null),
                fu(e, t, n),
                (du = a),
                null !== (cu = r) &&
                  (du
                    ? ((e = cu),
                      (n = n.stateNode),
                      8 === e.nodeType
                        ? e.parentNode.removeChild(n)
                        : e.removeChild(n))
                    : cu.removeChild(n.stateNode));
              break;
            case 18:
              null !== cu &&
                (du
                  ? ((e = cu),
                    (n = n.stateNode),
                    8 === e.nodeType
                      ? ua(e.parentNode, n)
                      : 1 === e.nodeType && ua(e, n),
                    Ht(e))
                  : ua(cu, n.stateNode));
              break;
            case 4:
              (r = cu),
                (a = du),
                (cu = n.stateNode.containerInfo),
                (du = !0),
                fu(e, t, n),
                (cu = r),
                (du = a);
              break;
            case 0:
            case 11:
            case 14:
            case 15:
              if (
                !Gi &&
                null !== (r = n.updateQueue) &&
                null !== (r = r.lastEffect)
              ) {
                a = r = r.next;
                do {
                  var l = a,
                    o = l.destroy;
                  (l = l.tag),
                    void 0 !== o &&
                      (0 !== (2 & l) || 0 !== (4 & l)) &&
                      eu(n, t, o),
                    (a = a.next);
                } while (a !== r);
              }
              fu(e, t, n);
              break;
            case 1:
              if (
                !Gi &&
                ($i(n, t),
                'function' === typeof (r = n.stateNode).componentWillUnmount)
              )
                try {
                  (r.props = n.memoizedProps),
                    (r.state = n.memoizedState),
                    r.componentWillUnmount();
                } catch (i) {
                  xs(n, t, i);
                }
              fu(e, t, n);
              break;
            case 21:
              fu(e, t, n);
              break;
            case 22:
              1 & n.mode
                ? ((Gi = (r = Gi) || null !== n.memoizedState),
                  fu(e, t, n),
                  (Gi = r))
                : fu(e, t, n);
              break;
            default:
              fu(e, t, n);
          }
        }
        function hu(e) {
          var t = e.updateQueue;
          if (null !== t) {
            e.updateQueue = null;
            var n = e.stateNode;
            null === n && (n = e.stateNode = new Xi()),
              t.forEach(function (t) {
                var r = Ls.bind(null, e, t);
                n.has(t) || (n.add(t), t.then(r, r));
              });
          }
        }
        function mu(e, t) {
          var n = t.deletions;
          if (null !== n)
            for (var r = 0; r < n.length; r++) {
              var a = n[r];
              try {
                var o = e,
                  i = t,
                  u = i;
                e: for (; null !== u; ) {
                  switch (u.tag) {
                    case 5:
                      (cu = u.stateNode), (du = !1);
                      break e;
                    case 3:
                    case 4:
                      (cu = u.stateNode.containerInfo), (du = !0);
                      break e;
                  }
                  u = u.return;
                }
                if (null === cu) throw Error(l(160));
                pu(o, i, a), (cu = null), (du = !1);
                var s = a.alternate;
                null !== s && (s.return = null), (a.return = null);
              } catch (c) {
                xs(a, t, c);
              }
            }
          if (12854 & t.subtreeFlags)
            for (t = t.child; null !== t; ) gu(t, e), (t = t.sibling);
        }
        function gu(e, t) {
          var n = e.alternate,
            r = e.flags;
          switch (e.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
              if ((mu(t, e), vu(e), 4 & r)) {
                try {
                  nu(3, e, e.return), ru(3, e);
                } catch (g) {
                  xs(e, e.return, g);
                }
                try {
                  nu(5, e, e.return);
                } catch (g) {
                  xs(e, e.return, g);
                }
              }
              break;
            case 1:
              mu(t, e), vu(e), 512 & r && null !== n && $i(n, n.return);
              break;
            case 5:
              if (
                (mu(t, e),
                vu(e),
                512 & r && null !== n && $i(n, n.return),
                32 & e.flags)
              ) {
                var a = e.stateNode;
                try {
                  fe(a, '');
                } catch (g) {
                  xs(e, e.return, g);
                }
              }
              if (4 & r && null != (a = e.stateNode)) {
                var o = e.memoizedProps,
                  i = null !== n ? n.memoizedProps : o,
                  u = e.type,
                  s = e.updateQueue;
                if (((e.updateQueue = null), null !== s))
                  try {
                    'input' === u &&
                      'radio' === o.type &&
                      null != o.name &&
                      X(a, o),
                      be(u, i);
                    var c = be(u, o);
                    for (i = 0; i < s.length; i += 2) {
                      var d = s[i],
                        f = s[i + 1];
                      'style' === d
                        ? ge(a, f)
                        : 'dangerouslySetInnerHTML' === d
                        ? de(a, f)
                        : 'children' === d
                        ? fe(a, f)
                        : b(a, d, f, c);
                    }
                    switch (u) {
                      case 'input':
                        Y(a, o);
                        break;
                      case 'textarea':
                        le(a, o);
                        break;
                      case 'select':
                        var p = a._wrapperState.wasMultiple;
                        a._wrapperState.wasMultiple = !!o.multiple;
                        var h = o.value;
                        null != h
                          ? ne(a, !!o.multiple, h, !1)
                          : p !== !!o.multiple &&
                            (null != o.defaultValue
                              ? ne(a, !!o.multiple, o.defaultValue, !0)
                              : ne(a, !!o.multiple, o.multiple ? [] : '', !1));
                    }
                    a[pa] = o;
                  } catch (g) {
                    xs(e, e.return, g);
                  }
              }
              break;
            case 6:
              if ((mu(t, e), vu(e), 4 & r)) {
                if (null === e.stateNode) throw Error(l(162));
                (a = e.stateNode), (o = e.memoizedProps);
                try {
                  a.nodeValue = o;
                } catch (g) {
                  xs(e, e.return, g);
                }
              }
              break;
            case 3:
              if (
                (mu(t, e),
                vu(e),
                4 & r && null !== n && n.memoizedState.isDehydrated)
              )
                try {
                  Ht(t.containerInfo);
                } catch (g) {
                  xs(e, e.return, g);
                }
              break;
            case 4:
            default:
              mu(t, e), vu(e);
              break;
            case 13:
              mu(t, e),
                vu(e),
                8192 & (a = e.child).flags &&
                  ((o = null !== a.memoizedState),
                  (a.stateNode.isHidden = o),
                  !o ||
                    (null !== a.alternate &&
                      null !== a.alternate.memoizedState) ||
                    (Vu = Xe())),
                4 & r && hu(e);
              break;
            case 22:
              if (
                ((d = null !== n && null !== n.memoizedState),
                1 & e.mode
                  ? ((Gi = (c = Gi) || d), mu(t, e), (Gi = c))
                  : mu(t, e),
                vu(e),
                8192 & r)
              ) {
                if (
                  ((c = null !== e.memoizedState),
                  (e.stateNode.isHidden = c) && !d && 0 !== (1 & e.mode))
                )
                  for (Yi = e, d = e.child; null !== d; ) {
                    for (f = Yi = d; null !== Yi; ) {
                      switch (((h = (p = Yi).child), p.tag)) {
                        case 0:
                        case 11:
                        case 14:
                        case 15:
                          nu(4, p, p.return);
                          break;
                        case 1:
                          $i(p, p.return);
                          var m = p.stateNode;
                          if ('function' === typeof m.componentWillUnmount) {
                            (r = p), (n = p.return);
                            try {
                              (t = r),
                                (m.props = t.memoizedProps),
                                (m.state = t.memoizedState),
                                m.componentWillUnmount();
                            } catch (g) {
                              xs(r, n, g);
                            }
                          }
                          break;
                        case 5:
                          $i(p, p.return);
                          break;
                        case 22:
                          if (null !== p.memoizedState) {
                            wu(f);
                            continue;
                          }
                      }
                      null !== h ? ((h.return = p), (Yi = h)) : wu(f);
                    }
                    d = d.sibling;
                  }
                e: for (d = null, f = e; ; ) {
                  if (5 === f.tag) {
                    if (null === d) {
                      d = f;
                      try {
                        (a = f.stateNode),
                          c
                            ? 'function' === typeof (o = a.style).setProperty
                              ? o.setProperty('display', 'none', 'important')
                              : (o.display = 'none')
                            : ((u = f.stateNode),
                              (i =
                                void 0 !== (s = f.memoizedProps.style) &&
                                null !== s &&
                                s.hasOwnProperty('display')
                                  ? s.display
                                  : null),
                              (u.style.display = me('display', i)));
                      } catch (g) {
                        xs(e, e.return, g);
                      }
                    }
                  } else if (6 === f.tag) {
                    if (null === d)
                      try {
                        f.stateNode.nodeValue = c ? '' : f.memoizedProps;
                      } catch (g) {
                        xs(e, e.return, g);
                      }
                  } else if (
                    ((22 !== f.tag && 23 !== f.tag) ||
                      null === f.memoizedState ||
                      f === e) &&
                    null !== f.child
                  ) {
                    (f.child.return = f), (f = f.child);
                    continue;
                  }
                  if (f === e) break e;
                  for (; null === f.sibling; ) {
                    if (null === f.return || f.return === e) break e;
                    d === f && (d = null), (f = f.return);
                  }
                  d === f && (d = null),
                    (f.sibling.return = f.return),
                    (f = f.sibling);
                }
              }
              break;
            case 19:
              mu(t, e), vu(e), 4 & r && hu(e);
            case 21:
          }
        }
        function vu(e) {
          var t = e.flags;
          if (2 & t) {
            try {
              e: {
                for (var n = e.return; null !== n; ) {
                  if (ou(n)) {
                    var r = n;
                    break e;
                  }
                  n = n.return;
                }
                throw Error(l(160));
              }
              switch (r.tag) {
                case 5:
                  var a = r.stateNode;
                  32 & r.flags && (fe(a, ''), (r.flags &= -33)),
                    su(e, iu(e), a);
                  break;
                case 3:
                case 4:
                  var o = r.stateNode.containerInfo;
                  uu(e, iu(e), o);
                  break;
                default:
                  throw Error(l(161));
              }
            } catch (i) {
              xs(e, e.return, i);
            }
            e.flags &= -3;
          }
          4096 & t && (e.flags &= -4097);
        }
        function yu(e, t, n) {
          (Yi = e), bu(e, t, n);
        }
        function bu(e, t, n) {
          for (var r = 0 !== (1 & e.mode); null !== Yi; ) {
            var a = Yi,
              l = a.child;
            if (22 === a.tag && r) {
              var o = null !== a.memoizedState || Zi;
              if (!o) {
                var i = a.alternate,
                  u = (null !== i && null !== i.memoizedState) || Gi;
                i = Zi;
                var s = Gi;
                if (((Zi = o), (Gi = u) && !s))
                  for (Yi = a; null !== Yi; )
                    (u = (o = Yi).child),
                      22 === o.tag && null !== o.memoizedState
                        ? Su(a)
                        : null !== u
                        ? ((u.return = o), (Yi = u))
                        : Su(a);
                for (; null !== l; ) (Yi = l), bu(l, t, n), (l = l.sibling);
                (Yi = a), (Zi = i), (Gi = s);
              }
              ku(e);
            } else
              0 !== (8772 & a.subtreeFlags) && null !== l
                ? ((l.return = a), (Yi = l))
                : ku(e);
          }
        }
        function ku(e) {
          for (; null !== Yi; ) {
            var t = Yi;
            if (0 !== (8772 & t.flags)) {
              var n = t.alternate;
              try {
                if (0 !== (8772 & t.flags))
                  switch (t.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Gi || ru(5, t);
                      break;
                    case 1:
                      var r = t.stateNode;
                      if (4 & t.flags && !Gi)
                        if (null === n) r.componentDidMount();
                        else {
                          var a =
                            t.elementType === t.type
                              ? n.memoizedProps
                              : ni(t.type, n.memoizedProps);
                          r.componentDidUpdate(
                            a,
                            n.memoizedState,
                            r.__reactInternalSnapshotBeforeUpdate
                          );
                        }
                      var o = t.updateQueue;
                      null !== o && Ul(t, o, r);
                      break;
                    case 3:
                      var i = t.updateQueue;
                      if (null !== i) {
                        if (((n = null), null !== t.child))
                          switch (t.child.tag) {
                            case 5:
                            case 1:
                              n = t.child.stateNode;
                          }
                        Ul(t, i, n);
                      }
                      break;
                    case 5:
                      var u = t.stateNode;
                      if (null === n && 4 & t.flags) {
                        n = u;
                        var s = t.memoizedProps;
                        switch (t.type) {
                          case 'button':
                          case 'input':
                          case 'select':
                          case 'textarea':
                            s.autoFocus && n.focus();
                            break;
                          case 'img':
                            s.src && (n.src = s.src);
                        }
                      }
                      break;
                    case 6:
                    case 4:
                    case 12:
                    case 19:
                    case 17:
                    case 21:
                    case 22:
                    case 23:
                    case 25:
                      break;
                    case 13:
                      if (null === t.memoizedState) {
                        var c = t.alternate;
                        if (null !== c) {
                          var d = c.memoizedState;
                          if (null !== d) {
                            var f = d.dehydrated;
                            null !== f && Ht(f);
                          }
                        }
                      }
                      break;
                    default:
                      throw Error(l(163));
                  }
                Gi || (512 & t.flags && au(t));
              } catch (p) {
                xs(t, t.return, p);
              }
            }
            if (t === e) {
              Yi = null;
              break;
            }
            if (null !== (n = t.sibling)) {
              (n.return = t.return), (Yi = n);
              break;
            }
            Yi = t.return;
          }
        }
        function wu(e) {
          for (; null !== Yi; ) {
            var t = Yi;
            if (t === e) {
              Yi = null;
              break;
            }
            var n = t.sibling;
            if (null !== n) {
              (n.return = t.return), (Yi = n);
              break;
            }
            Yi = t.return;
          }
        }
        function Su(e) {
          for (; null !== Yi; ) {
            var t = Yi;
            try {
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  var n = t.return;
                  try {
                    ru(4, t);
                  } catch (u) {
                    xs(t, n, u);
                  }
                  break;
                case 1:
                  var r = t.stateNode;
                  if ('function' === typeof r.componentDidMount) {
                    var a = t.return;
                    try {
                      r.componentDidMount();
                    } catch (u) {
                      xs(t, a, u);
                    }
                  }
                  var l = t.return;
                  try {
                    au(t);
                  } catch (u) {
                    xs(t, l, u);
                  }
                  break;
                case 5:
                  var o = t.return;
                  try {
                    au(t);
                  } catch (u) {
                    xs(t, o, u);
                  }
              }
            } catch (u) {
              xs(t, t.return, u);
            }
            if (t === e) {
              Yi = null;
              break;
            }
            var i = t.sibling;
            if (null !== i) {
              (i.return = t.return), (Yi = i);
              break;
            }
            Yi = t.return;
          }
        }
        var _u,
          xu = Math.ceil,
          Eu = k.ReactCurrentDispatcher,
          Cu = k.ReactCurrentOwner,
          Nu = k.ReactCurrentBatchConfig,
          Lu = 0,
          Tu = null,
          Pu = null,
          Au = 0,
          zu = 0,
          ju = xa(0),
          Ou = 0,
          Ru = null,
          Mu = 0,
          Du = 0,
          Fu = 0,
          Iu = null,
          Bu = null,
          Vu = 0,
          Hu = 1 / 0,
          Uu = null,
          Wu = !1,
          qu = null,
          Qu = null,
          Ju = !1,
          Ku = null,
          Zu = 0,
          Gu = 0,
          Xu = null,
          Yu = -1,
          $u = 0;
        function es() {
          return 0 !== (6 & Lu) ? Xe() : -1 !== Yu ? Yu : (Yu = Xe());
        }
        function ts(e) {
          return 0 === (1 & e.mode)
            ? 1
            : 0 !== (2 & Lu) && 0 !== Au
            ? Au & -Au
            : null !== ml.transition
            ? (0 === $u && ($u = mt()), $u)
            : 0 !== (e = bt)
            ? e
            : (e = void 0 === (e = window.event) ? 16 : Gt(e.type));
        }
        function ns(e, t, n, r) {
          if (50 < Gu) throw ((Gu = 0), (Xu = null), Error(l(185)));
          vt(e, n, r),
            (0 !== (2 & Lu) && e === Tu) ||
              (e === Tu && (0 === (2 & Lu) && (Du |= n), 4 === Ou && is(e, Au)),
              rs(e, r),
              1 === n &&
                0 === Lu &&
                0 === (1 & t.mode) &&
                ((Hu = Xe() + 500), Ia && Ha()));
        }
        function rs(e, t) {
          var n = e.callbackNode;
          !(function (e, t) {
            for (
              var n = e.suspendedLanes,
                r = e.pingedLanes,
                a = e.expirationTimes,
                l = e.pendingLanes;
              0 < l;

            ) {
              var o = 31 - ot(l),
                i = 1 << o,
                u = a[o];
              -1 === u
                ? (0 !== (i & n) && 0 === (i & r)) || (a[o] = pt(i, t))
                : u <= t && (e.expiredLanes |= i),
                (l &= ~i);
            }
          })(e, t);
          var r = ft(e, e === Tu ? Au : 0);
          if (0 === r)
            null !== n && Ke(n),
              (e.callbackNode = null),
              (e.callbackPriority = 0);
          else if (((t = r & -r), e.callbackPriority !== t)) {
            if ((null != n && Ke(n), 1 === t))
              0 === e.tag
                ? (function (e) {
                    (Ia = !0), Va(e);
                  })(us.bind(null, e))
                : Va(us.bind(null, e)),
                oa(function () {
                  0 === (6 & Lu) && Ha();
                }),
                (n = null);
            else {
              switch (kt(r)) {
                case 1:
                  n = $e;
                  break;
                case 4:
                  n = et;
                  break;
                case 16:
                default:
                  n = tt;
                  break;
                case 536870912:
                  n = rt;
              }
              n = Ts(n, as.bind(null, e));
            }
            (e.callbackPriority = t), (e.callbackNode = n);
          }
        }
        function as(e, t) {
          if (((Yu = -1), ($u = 0), 0 !== (6 & Lu))) throw Error(l(327));
          var n = e.callbackNode;
          if (Ss() && e.callbackNode !== n) return null;
          var r = ft(e, e === Tu ? Au : 0);
          if (0 === r) return null;
          if (0 !== (30 & r) || 0 !== (r & e.expiredLanes) || t) t = gs(e, r);
          else {
            t = r;
            var a = Lu;
            Lu |= 2;
            var o = hs();
            for (
              (Tu === e && Au === t) ||
              ((Uu = null), (Hu = Xe() + 500), fs(e, t));
              ;

            )
              try {
                ys();
                break;
              } catch (u) {
                ps(e, u);
              }
            Cl(),
              (Eu.current = o),
              (Lu = a),
              null !== Pu ? (t = 0) : ((Tu = null), (Au = 0), (t = Ou));
          }
          if (0 !== t) {
            if (
              (2 === t && 0 !== (a = ht(e)) && ((r = a), (t = ls(e, a))),
              1 === t)
            )
              throw ((n = Ru), fs(e, 0), is(e, r), rs(e, Xe()), n);
            if (6 === t) is(e, r);
            else {
              if (
                ((a = e.current.alternate),
                0 === (30 & r) &&
                  !(function (e) {
                    for (var t = e; ; ) {
                      if (16384 & t.flags) {
                        var n = t.updateQueue;
                        if (null !== n && null !== (n = n.stores))
                          for (var r = 0; r < n.length; r++) {
                            var a = n[r],
                              l = a.getSnapshot;
                            a = a.value;
                            try {
                              if (!ir(l(), a)) return !1;
                            } catch (i) {
                              return !1;
                            }
                          }
                      }
                      if (((n = t.child), 16384 & t.subtreeFlags && null !== n))
                        (n.return = t), (t = n);
                      else {
                        if (t === e) break;
                        for (; null === t.sibling; ) {
                          if (null === t.return || t.return === e) return !0;
                          t = t.return;
                        }
                        (t.sibling.return = t.return), (t = t.sibling);
                      }
                    }
                    return !0;
                  })(a) &&
                  (2 === (t = gs(e, r)) &&
                    0 !== (o = ht(e)) &&
                    ((r = o), (t = ls(e, o))),
                  1 === t))
              )
                throw ((n = Ru), fs(e, 0), is(e, r), rs(e, Xe()), n);
              switch (((e.finishedWork = a), (e.finishedLanes = r), t)) {
                case 0:
                case 1:
                  throw Error(l(345));
                case 2:
                case 5:
                  ws(e, Bu, Uu);
                  break;
                case 3:
                  if (
                    (is(e, r),
                    (130023424 & r) === r && 10 < (t = Vu + 500 - Xe()))
                  ) {
                    if (0 !== ft(e, 0)) break;
                    if (((a = e.suspendedLanes) & r) !== r) {
                      es(), (e.pingedLanes |= e.suspendedLanes & a);
                      break;
                    }
                    e.timeoutHandle = ra(ws.bind(null, e, Bu, Uu), t);
                    break;
                  }
                  ws(e, Bu, Uu);
                  break;
                case 4:
                  if ((is(e, r), (4194240 & r) === r)) break;
                  for (t = e.eventTimes, a = -1; 0 < r; ) {
                    var i = 31 - ot(r);
                    (o = 1 << i), (i = t[i]) > a && (a = i), (r &= ~o);
                  }
                  if (
                    ((r = a),
                    10 <
                      (r =
                        (120 > (r = Xe() - r)
                          ? 120
                          : 480 > r
                          ? 480
                          : 1080 > r
                          ? 1080
                          : 1920 > r
                          ? 1920
                          : 3e3 > r
                          ? 3e3
                          : 4320 > r
                          ? 4320
                          : 1960 * xu(r / 1960)) - r))
                  ) {
                    e.timeoutHandle = ra(ws.bind(null, e, Bu, Uu), r);
                    break;
                  }
                  ws(e, Bu, Uu);
                  break;
                default:
                  throw Error(l(329));
              }
            }
          }
          return rs(e, Xe()), e.callbackNode === n ? as.bind(null, e) : null;
        }
        function ls(e, t) {
          var n = Iu;
          return (
            e.current.memoizedState.isDehydrated && (fs(e, t).flags |= 256),
            2 !== (e = gs(e, t)) && ((t = Bu), (Bu = n), null !== t && os(t)),
            e
          );
        }
        function os(e) {
          null === Bu ? (Bu = e) : Bu.push.apply(Bu, e);
        }
        function is(e, t) {
          for (
            t &= ~Fu,
              t &= ~Du,
              e.suspendedLanes |= t,
              e.pingedLanes &= ~t,
              e = e.expirationTimes;
            0 < t;

          ) {
            var n = 31 - ot(t),
              r = 1 << n;
            (e[n] = -1), (t &= ~r);
          }
        }
        function us(e) {
          if (0 !== (6 & Lu)) throw Error(l(327));
          Ss();
          var t = ft(e, 0);
          if (0 === (1 & t)) return rs(e, Xe()), null;
          var n = gs(e, t);
          if (0 !== e.tag && 2 === n) {
            var r = ht(e);
            0 !== r && ((t = r), (n = ls(e, r)));
          }
          if (1 === n) throw ((n = Ru), fs(e, 0), is(e, t), rs(e, Xe()), n);
          if (6 === n) throw Error(l(345));
          return (
            (e.finishedWork = e.current.alternate),
            (e.finishedLanes = t),
            ws(e, Bu, Uu),
            rs(e, Xe()),
            null
          );
        }
        function ss(e, t) {
          var n = Lu;
          Lu |= 1;
          try {
            return e(t);
          } finally {
            0 === (Lu = n) && ((Hu = Xe() + 500), Ia && Ha());
          }
        }
        function cs(e) {
          null !== Ku && 0 === Ku.tag && 0 === (6 & Lu) && Ss();
          var t = Lu;
          Lu |= 1;
          var n = Nu.transition,
            r = bt;
          try {
            if (((Nu.transition = null), (bt = 1), e)) return e();
          } finally {
            (bt = r), (Nu.transition = n), 0 === (6 & (Lu = t)) && Ha();
          }
        }
        function ds() {
          (zu = ju.current), Ea(ju);
        }
        function fs(e, t) {
          (e.finishedWork = null), (e.finishedLanes = 0);
          var n = e.timeoutHandle;
          if ((-1 !== n && ((e.timeoutHandle = -1), aa(n)), null !== Pu))
            for (n = Pu.return; null !== n; ) {
              var r = n;
              switch ((tl(r), r.tag)) {
                case 1:
                  null !== (r = r.type.childContextTypes) &&
                    void 0 !== r &&
                    ja();
                  break;
                case 3:
                  Gl(), Ea(Ta), Ea(La), no();
                  break;
                case 5:
                  Yl(r);
                  break;
                case 4:
                  Gl();
                  break;
                case 13:
                case 19:
                  Ea($l);
                  break;
                case 10:
                  Nl(r.type._context);
                  break;
                case 22:
                case 23:
                  ds();
              }
              n = n.return;
            }
          if (
            ((Tu = e),
            (Pu = e = js(e.current, null)),
            (Au = zu = t),
            (Ou = 0),
            (Ru = null),
            (Fu = Du = Mu = 0),
            (Bu = Iu = null),
            null !== Al)
          ) {
            for (t = 0; t < Al.length; t++)
              if (null !== (r = (n = Al[t]).interleaved)) {
                n.interleaved = null;
                var a = r.next,
                  l = n.pending;
                if (null !== l) {
                  var o = l.next;
                  (l.next = a), (r.next = o);
                }
                n.pending = r;
              }
            Al = null;
          }
          return e;
        }
        function ps(e, t) {
          for (;;) {
            var n = Pu;
            try {
              if ((Cl(), (ro.current = Yo), so)) {
                for (var r = oo.memoizedState; null !== r; ) {
                  var a = r.queue;
                  null !== a && (a.pending = null), (r = r.next);
                }
                so = !1;
              }
              if (
                ((lo = 0),
                (uo = io = oo = null),
                (co = !1),
                (fo = 0),
                (Cu.current = null),
                null === n || null === n.return)
              ) {
                (Ou = 1), (Ru = t), (Pu = null);
                break;
              }
              e: {
                var o = e,
                  i = n.return,
                  u = n,
                  s = t;
                if (
                  ((t = Au),
                  (u.flags |= 32768),
                  null !== s &&
                    'object' === typeof s &&
                    'function' === typeof s.then)
                ) {
                  var c = s,
                    d = u,
                    f = d.tag;
                  if (0 === (1 & d.mode) && (0 === f || 11 === f || 15 === f)) {
                    var p = d.alternate;
                    p
                      ? ((d.updateQueue = p.updateQueue),
                        (d.memoizedState = p.memoizedState),
                        (d.lanes = p.lanes))
                      : ((d.updateQueue = null), (d.memoizedState = null));
                  }
                  var h = gi(i);
                  if (null !== h) {
                    (h.flags &= -257),
                      vi(h, i, u, 0, t),
                      1 & h.mode && mi(o, c, t),
                      (s = c);
                    var m = (t = h).updateQueue;
                    if (null === m) {
                      var g = new Set();
                      g.add(s), (t.updateQueue = g);
                    } else m.add(s);
                    break e;
                  }
                  if (0 === (1 & t)) {
                    mi(o, c, t), ms();
                    break e;
                  }
                  s = Error(l(426));
                } else if (al && 1 & u.mode) {
                  var v = gi(i);
                  if (null !== v) {
                    0 === (65536 & v.flags) && (v.flags |= 256),
                      vi(v, i, u, 0, t),
                      hl(si(s, u));
                    break e;
                  }
                }
                (o = s = si(s, u)),
                  4 !== Ou && (Ou = 2),
                  null === Iu ? (Iu = [o]) : Iu.push(o),
                  (o = i);
                do {
                  switch (o.tag) {
                    case 3:
                      (o.flags |= 65536),
                        (t &= -t),
                        (o.lanes |= t),
                        Vl(o, pi(0, s, t));
                      break e;
                    case 1:
                      u = s;
                      var y = o.type,
                        b = o.stateNode;
                      if (
                        0 === (128 & o.flags) &&
                        ('function' === typeof y.getDerivedStateFromError ||
                          (null !== b &&
                            'function' === typeof b.componentDidCatch &&
                            (null === Qu || !Qu.has(b))))
                      ) {
                        (o.flags |= 65536),
                          (t &= -t),
                          (o.lanes |= t),
                          Vl(o, hi(o, u, t));
                        break e;
                      }
                  }
                  o = o.return;
                } while (null !== o);
              }
              ks(n);
            } catch (k) {
              (t = k), Pu === n && null !== n && (Pu = n = n.return);
              continue;
            }
            break;
          }
        }
        function hs() {
          var e = Eu.current;
          return (Eu.current = Yo), null === e ? Yo : e;
        }
        function ms() {
          (0 !== Ou && 3 !== Ou && 2 !== Ou) || (Ou = 4),
            null === Tu ||
              (0 === (268435455 & Mu) && 0 === (268435455 & Du)) ||
              is(Tu, Au);
        }
        function gs(e, t) {
          var n = Lu;
          Lu |= 2;
          var r = hs();
          for ((Tu === e && Au === t) || ((Uu = null), fs(e, t)); ; )
            try {
              vs();
              break;
            } catch (a) {
              ps(e, a);
            }
          if ((Cl(), (Lu = n), (Eu.current = r), null !== Pu))
            throw Error(l(261));
          return (Tu = null), (Au = 0), Ou;
        }
        function vs() {
          for (; null !== Pu; ) bs(Pu);
        }
        function ys() {
          for (; null !== Pu && !Ze(); ) bs(Pu);
        }
        function bs(e) {
          var t = _u(e.alternate, e, zu);
          (e.memoizedProps = e.pendingProps),
            null === t ? ks(e) : (Pu = t),
            (Cu.current = null);
        }
        function ks(e) {
          var t = e;
          do {
            var n = t.alternate;
            if (((e = t.return), 0 === (32768 & t.flags))) {
              if (null !== (n = Ji(n, t, zu))) return void (Pu = n);
            } else {
              if (null !== (n = Ki(n, t)))
                return (n.flags &= 32767), void (Pu = n);
              if (null === e) return (Ou = 6), void (Pu = null);
              (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
            }
            if (null !== (t = t.sibling)) return void (Pu = t);
            Pu = t = e;
          } while (null !== t);
          0 === Ou && (Ou = 5);
        }
        function ws(e, t, n) {
          var r = bt,
            a = Nu.transition;
          try {
            (Nu.transition = null),
              (bt = 1),
              (function (e, t, n, r) {
                do {
                  Ss();
                } while (null !== Ku);
                if (0 !== (6 & Lu)) throw Error(l(327));
                n = e.finishedWork;
                var a = e.finishedLanes;
                if (null === n) return null;
                if (
                  ((e.finishedWork = null),
                  (e.finishedLanes = 0),
                  n === e.current)
                )
                  throw Error(l(177));
                (e.callbackNode = null), (e.callbackPriority = 0);
                var o = n.lanes | n.childLanes;
                if (
                  ((function (e, t) {
                    var n = e.pendingLanes & ~t;
                    (e.pendingLanes = t),
                      (e.suspendedLanes = 0),
                      (e.pingedLanes = 0),
                      (e.expiredLanes &= t),
                      (e.mutableReadLanes &= t),
                      (e.entangledLanes &= t),
                      (t = e.entanglements);
                    var r = e.eventTimes;
                    for (e = e.expirationTimes; 0 < n; ) {
                      var a = 31 - ot(n),
                        l = 1 << a;
                      (t[a] = 0), (r[a] = -1), (e[a] = -1), (n &= ~l);
                    }
                  })(e, o),
                  e === Tu && ((Pu = Tu = null), (Au = 0)),
                  (0 === (2064 & n.subtreeFlags) && 0 === (2064 & n.flags)) ||
                    Ju ||
                    ((Ju = !0),
                    Ts(tt, function () {
                      return Ss(), null;
                    })),
                  (o = 0 !== (15990 & n.flags)),
                  0 !== (15990 & n.subtreeFlags) || o)
                ) {
                  (o = Nu.transition), (Nu.transition = null);
                  var i = bt;
                  bt = 1;
                  var u = Lu;
                  (Lu |= 4),
                    (Cu.current = null),
                    (function (e, t) {
                      if (((ea = Wt), pr((e = fr())))) {
                        if ('selectionStart' in e)
                          var n = {
                            start: e.selectionStart,
                            end: e.selectionEnd,
                          };
                        else
                          e: {
                            var r =
                              (n =
                                ((n = e.ownerDocument) && n.defaultView) ||
                                window).getSelection && n.getSelection();
                            if (r && 0 !== r.rangeCount) {
                              n = r.anchorNode;
                              var a = r.anchorOffset,
                                o = r.focusNode;
                              r = r.focusOffset;
                              try {
                                n.nodeType, o.nodeType;
                              } catch (w) {
                                n = null;
                                break e;
                              }
                              var i = 0,
                                u = -1,
                                s = -1,
                                c = 0,
                                d = 0,
                                f = e,
                                p = null;
                              t: for (;;) {
                                for (
                                  var h;
                                  f !== n ||
                                    (0 !== a && 3 !== f.nodeType) ||
                                    (u = i + a),
                                    f !== o ||
                                      (0 !== r && 3 !== f.nodeType) ||
                                      (s = i + r),
                                    3 === f.nodeType &&
                                      (i += f.nodeValue.length),
                                    null !== (h = f.firstChild);

                                )
                                  (p = f), (f = h);
                                for (;;) {
                                  if (f === e) break t;
                                  if (
                                    (p === n && ++c === a && (u = i),
                                    p === o && ++d === r && (s = i),
                                    null !== (h = f.nextSibling))
                                  )
                                    break;
                                  p = (f = p).parentNode;
                                }
                                f = h;
                              }
                              n =
                                -1 === u || -1 === s
                                  ? null
                                  : { start: u, end: s };
                            } else n = null;
                          }
                        n = n || { start: 0, end: 0 };
                      } else n = null;
                      for (
                        ta = { focusedElem: e, selectionRange: n },
                          Wt = !1,
                          Yi = t;
                        null !== Yi;

                      )
                        if (
                          ((e = (t = Yi).child),
                          0 !== (1028 & t.subtreeFlags) && null !== e)
                        )
                          (e.return = t), (Yi = e);
                        else
                          for (; null !== Yi; ) {
                            t = Yi;
                            try {
                              var m = t.alternate;
                              if (0 !== (1024 & t.flags))
                                switch (t.tag) {
                                  case 0:
                                  case 11:
                                  case 15:
                                  case 5:
                                  case 6:
                                  case 4:
                                  case 17:
                                    break;
                                  case 1:
                                    if (null !== m) {
                                      var g = m.memoizedProps,
                                        v = m.memoizedState,
                                        y = t.stateNode,
                                        b = y.getSnapshotBeforeUpdate(
                                          t.elementType === t.type
                                            ? g
                                            : ni(t.type, g),
                                          v
                                        );
                                      y.__reactInternalSnapshotBeforeUpdate = b;
                                    }
                                    break;
                                  case 3:
                                    var k = t.stateNode.containerInfo;
                                    1 === k.nodeType
                                      ? (k.textContent = '')
                                      : 9 === k.nodeType &&
                                        k.documentElement &&
                                        k.removeChild(k.documentElement);
                                    break;
                                  default:
                                    throw Error(l(163));
                                }
                            } catch (w) {
                              xs(t, t.return, w);
                            }
                            if (null !== (e = t.sibling)) {
                              (e.return = t.return), (Yi = e);
                              break;
                            }
                            Yi = t.return;
                          }
                      (m = tu), (tu = !1);
                    })(e, n),
                    gu(n, e),
                    hr(ta),
                    (Wt = !!ea),
                    (ta = ea = null),
                    (e.current = n),
                    yu(n, e, a),
                    Ge(),
                    (Lu = u),
                    (bt = i),
                    (Nu.transition = o);
                } else e.current = n;
                if (
                  (Ju && ((Ju = !1), (Ku = e), (Zu = a)),
                  (o = e.pendingLanes),
                  0 === o && (Qu = null),
                  (function (e) {
                    if (lt && 'function' === typeof lt.onCommitFiberRoot)
                      try {
                        lt.onCommitFiberRoot(
                          at,
                          e,
                          void 0,
                          128 === (128 & e.current.flags)
                        );
                      } catch (t) {}
                  })(n.stateNode),
                  rs(e, Xe()),
                  null !== t)
                )
                  for (r = e.onRecoverableError, n = 0; n < t.length; n++)
                    (a = t[n]),
                      r(a.value, { componentStack: a.stack, digest: a.digest });
                if (Wu) throw ((Wu = !1), (e = qu), (qu = null), e);
                0 !== (1 & Zu) && 0 !== e.tag && Ss(),
                  (o = e.pendingLanes),
                  0 !== (1 & o)
                    ? e === Xu
                      ? Gu++
                      : ((Gu = 0), (Xu = e))
                    : (Gu = 0),
                  Ha();
              })(e, t, n, r);
          } finally {
            (Nu.transition = a), (bt = r);
          }
          return null;
        }
        function Ss() {
          if (null !== Ku) {
            var e = kt(Zu),
              t = Nu.transition,
              n = bt;
            try {
              if (((Nu.transition = null), (bt = 16 > e ? 16 : e), null === Ku))
                var r = !1;
              else {
                if (((e = Ku), (Ku = null), (Zu = 0), 0 !== (6 & Lu)))
                  throw Error(l(331));
                var a = Lu;
                for (Lu |= 4, Yi = e.current; null !== Yi; ) {
                  var o = Yi,
                    i = o.child;
                  if (0 !== (16 & Yi.flags)) {
                    var u = o.deletions;
                    if (null !== u) {
                      for (var s = 0; s < u.length; s++) {
                        var c = u[s];
                        for (Yi = c; null !== Yi; ) {
                          var d = Yi;
                          switch (d.tag) {
                            case 0:
                            case 11:
                            case 15:
                              nu(8, d, o);
                          }
                          var f = d.child;
                          if (null !== f) (f.return = d), (Yi = f);
                          else
                            for (; null !== Yi; ) {
                              var p = (d = Yi).sibling,
                                h = d.return;
                              if ((lu(d), d === c)) {
                                Yi = null;
                                break;
                              }
                              if (null !== p) {
                                (p.return = h), (Yi = p);
                                break;
                              }
                              Yi = h;
                            }
                        }
                      }
                      var m = o.alternate;
                      if (null !== m) {
                        var g = m.child;
                        if (null !== g) {
                          m.child = null;
                          do {
                            var v = g.sibling;
                            (g.sibling = null), (g = v);
                          } while (null !== g);
                        }
                      }
                      Yi = o;
                    }
                  }
                  if (0 !== (2064 & o.subtreeFlags) && null !== i)
                    (i.return = o), (Yi = i);
                  else
                    e: for (; null !== Yi; ) {
                      if (0 !== (2048 & (o = Yi).flags))
                        switch (o.tag) {
                          case 0:
                          case 11:
                          case 15:
                            nu(9, o, o.return);
                        }
                      var y = o.sibling;
                      if (null !== y) {
                        (y.return = o.return), (Yi = y);
                        break e;
                      }
                      Yi = o.return;
                    }
                }
                var b = e.current;
                for (Yi = b; null !== Yi; ) {
                  var k = (i = Yi).child;
                  if (0 !== (2064 & i.subtreeFlags) && null !== k)
                    (k.return = i), (Yi = k);
                  else
                    e: for (i = b; null !== Yi; ) {
                      if (0 !== (2048 & (u = Yi).flags))
                        try {
                          switch (u.tag) {
                            case 0:
                            case 11:
                            case 15:
                              ru(9, u);
                          }
                        } catch (S) {
                          xs(u, u.return, S);
                        }
                      if (u === i) {
                        Yi = null;
                        break e;
                      }
                      var w = u.sibling;
                      if (null !== w) {
                        (w.return = u.return), (Yi = w);
                        break e;
                      }
                      Yi = u.return;
                    }
                }
                if (
                  ((Lu = a),
                  Ha(),
                  lt && 'function' === typeof lt.onPostCommitFiberRoot)
                )
                  try {
                    lt.onPostCommitFiberRoot(at, e);
                  } catch (S) {}
                r = !0;
              }
              return r;
            } finally {
              (bt = n), (Nu.transition = t);
            }
          }
          return !1;
        }
        function _s(e, t, n) {
          (e = Il(e, (t = pi(0, (t = si(n, t)), 1)), 1)),
            (t = es()),
            null !== e && (vt(e, 1, t), rs(e, t));
        }
        function xs(e, t, n) {
          if (3 === e.tag) _s(e, e, n);
          else
            for (; null !== t; ) {
              if (3 === t.tag) {
                _s(t, e, n);
                break;
              }
              if (1 === t.tag) {
                var r = t.stateNode;
                if (
                  'function' === typeof t.type.getDerivedStateFromError ||
                  ('function' === typeof r.componentDidCatch &&
                    (null === Qu || !Qu.has(r)))
                ) {
                  (t = Il(t, (e = hi(t, (e = si(n, e)), 1)), 1)),
                    (e = es()),
                    null !== t && (vt(t, 1, e), rs(t, e));
                  break;
                }
              }
              t = t.return;
            }
        }
        function Es(e, t, n) {
          var r = e.pingCache;
          null !== r && r.delete(t),
            (t = es()),
            (e.pingedLanes |= e.suspendedLanes & n),
            Tu === e &&
              (Au & n) === n &&
              (4 === Ou ||
              (3 === Ou && (130023424 & Au) === Au && 500 > Xe() - Vu)
                ? fs(e, 0)
                : (Fu |= n)),
            rs(e, t);
        }
        function Cs(e, t) {
          0 === t &&
            (0 === (1 & e.mode)
              ? (t = 1)
              : ((t = ct), 0 === (130023424 & (ct <<= 1)) && (ct = 4194304)));
          var n = es();
          null !== (e = Ol(e, t)) && (vt(e, t, n), rs(e, n));
        }
        function Ns(e) {
          var t = e.memoizedState,
            n = 0;
          null !== t && (n = t.retryLane), Cs(e, n);
        }
        function Ls(e, t) {
          var n = 0;
          switch (e.tag) {
            case 13:
              var r = e.stateNode,
                a = e.memoizedState;
              null !== a && (n = a.retryLane);
              break;
            case 19:
              r = e.stateNode;
              break;
            default:
              throw Error(l(314));
          }
          null !== r && r.delete(t), Cs(e, n);
        }
        function Ts(e, t) {
          return Je(e, t);
        }
        function Ps(e, t, n, r) {
          (this.tag = e),
            (this.key = n),
            (this.sibling =
              this.child =
              this.return =
              this.stateNode =
              this.type =
              this.elementType =
                null),
            (this.index = 0),
            (this.ref = null),
            (this.pendingProps = t),
            (this.dependencies =
              this.memoizedState =
              this.updateQueue =
              this.memoizedProps =
                null),
            (this.mode = r),
            (this.subtreeFlags = this.flags = 0),
            (this.deletions = null),
            (this.childLanes = this.lanes = 0),
            (this.alternate = null);
        }
        function As(e, t, n, r) {
          return new Ps(e, t, n, r);
        }
        function zs(e) {
          return !(!(e = e.prototype) || !e.isReactComponent);
        }
        function js(e, t) {
          var n = e.alternate;
          return (
            null === n
              ? (((n = As(e.tag, t, e.key, e.mode)).elementType =
                  e.elementType),
                (n.type = e.type),
                (n.stateNode = e.stateNode),
                (n.alternate = e),
                (e.alternate = n))
              : ((n.pendingProps = t),
                (n.type = e.type),
                (n.flags = 0),
                (n.subtreeFlags = 0),
                (n.deletions = null)),
            (n.flags = 14680064 & e.flags),
            (n.childLanes = e.childLanes),
            (n.lanes = e.lanes),
            (n.child = e.child),
            (n.memoizedProps = e.memoizedProps),
            (n.memoizedState = e.memoizedState),
            (n.updateQueue = e.updateQueue),
            (t = e.dependencies),
            (n.dependencies =
              null === t
                ? null
                : { lanes: t.lanes, firstContext: t.firstContext }),
            (n.sibling = e.sibling),
            (n.index = e.index),
            (n.ref = e.ref),
            n
          );
        }
        function Os(e, t, n, r, a, o) {
          var i = 2;
          if (((r = e), 'function' === typeof e)) zs(e) && (i = 1);
          else if ('string' === typeof e) i = 5;
          else
            e: switch (e) {
              case _:
                return Rs(n.children, a, o, t);
              case x:
                (i = 8), (a |= 8);
                break;
              case E:
                return (
                  ((e = As(12, n, t, 2 | a)).elementType = E), (e.lanes = o), e
                );
              case T:
                return (
                  ((e = As(13, n, t, a)).elementType = T), (e.lanes = o), e
                );
              case P:
                return (
                  ((e = As(19, n, t, a)).elementType = P), (e.lanes = o), e
                );
              case j:
                return Ms(n, a, o, t);
              default:
                if ('object' === typeof e && null !== e)
                  switch (e.$$typeof) {
                    case C:
                      i = 10;
                      break e;
                    case N:
                      i = 9;
                      break e;
                    case L:
                      i = 11;
                      break e;
                    case A:
                      i = 14;
                      break e;
                    case z:
                      (i = 16), (r = null);
                      break e;
                  }
                throw Error(l(130, null == e ? e : typeof e, ''));
            }
          return (
            ((t = As(i, n, t, a)).elementType = e),
            (t.type = r),
            (t.lanes = o),
            t
          );
        }
        function Rs(e, t, n, r) {
          return ((e = As(7, e, r, t)).lanes = n), e;
        }
        function Ms(e, t, n, r) {
          return (
            ((e = As(22, e, r, t)).elementType = j),
            (e.lanes = n),
            (e.stateNode = { isHidden: !1 }),
            e
          );
        }
        function Ds(e, t, n) {
          return ((e = As(6, e, null, t)).lanes = n), e;
        }
        function Fs(e, t, n) {
          return (
            ((t = As(
              4,
              null !== e.children ? e.children : [],
              e.key,
              t
            )).lanes = n),
            (t.stateNode = {
              containerInfo: e.containerInfo,
              pendingChildren: null,
              implementation: e.implementation,
            }),
            t
          );
        }
        function Is(e, t, n, r, a) {
          (this.tag = t),
            (this.containerInfo = e),
            (this.finishedWork =
              this.pingCache =
              this.current =
              this.pendingChildren =
                null),
            (this.timeoutHandle = -1),
            (this.callbackNode = this.pendingContext = this.context = null),
            (this.callbackPriority = 0),
            (this.eventTimes = gt(0)),
            (this.expirationTimes = gt(-1)),
            (this.entangledLanes =
              this.finishedLanes =
              this.mutableReadLanes =
              this.expiredLanes =
              this.pingedLanes =
              this.suspendedLanes =
              this.pendingLanes =
                0),
            (this.entanglements = gt(0)),
            (this.identifierPrefix = r),
            (this.onRecoverableError = a),
            (this.mutableSourceEagerHydrationData = null);
        }
        function Bs(e, t, n, r, a, l, o, i, u) {
          return (
            (e = new Is(e, t, n, i, u)),
            1 === t ? ((t = 1), !0 === l && (t |= 8)) : (t = 0),
            (l = As(3, null, null, t)),
            (e.current = l),
            (l.stateNode = e),
            (l.memoizedState = {
              element: r,
              isDehydrated: n,
              cache: null,
              transitions: null,
              pendingSuspenseBoundaries: null,
            }),
            Ml(l),
            e
          );
        }
        function Vs(e) {
          if (!e) return Na;
          e: {
            if (He((e = e._reactInternals)) !== e || 1 !== e.tag)
              throw Error(l(170));
            var t = e;
            do {
              switch (t.tag) {
                case 3:
                  t = t.stateNode.context;
                  break e;
                case 1:
                  if (za(t.type)) {
                    t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                    break e;
                  }
              }
              t = t.return;
            } while (null !== t);
            throw Error(l(171));
          }
          if (1 === e.tag) {
            var n = e.type;
            if (za(n)) return Ra(e, n, t);
          }
          return t;
        }
        function Hs(e, t, n, r, a, l, o, i, u) {
          return (
            ((e = Bs(n, r, !0, e, 0, l, 0, i, u)).context = Vs(null)),
            (n = e.current),
            ((l = Fl((r = es()), (a = ts(n)))).callback =
              void 0 !== t && null !== t ? t : null),
            Il(n, l, a),
            (e.current.lanes = a),
            vt(e, a, r),
            rs(e, r),
            e
          );
        }
        function Us(e, t, n, r) {
          var a = t.current,
            l = es(),
            o = ts(a);
          return (
            (n = Vs(n)),
            null === t.context ? (t.context = n) : (t.pendingContext = n),
            ((t = Fl(l, o)).payload = { element: e }),
            null !== (r = void 0 === r ? null : r) && (t.callback = r),
            null !== (e = Il(a, t, o)) && (ns(e, a, o, l), Bl(e, a, o)),
            o
          );
        }
        function Ws(e) {
          return (e = e.current).child
            ? (e.child.tag, e.child.stateNode)
            : null;
        }
        function qs(e, t) {
          if (null !== (e = e.memoizedState) && null !== e.dehydrated) {
            var n = e.retryLane;
            e.retryLane = 0 !== n && n < t ? n : t;
          }
        }
        function Qs(e, t) {
          qs(e, t), (e = e.alternate) && qs(e, t);
        }
        _u = function (e, t, n) {
          if (null !== e)
            if (e.memoizedProps !== t.pendingProps || Ta.current) bi = !0;
            else {
              if (0 === (e.lanes & n) && 0 === (128 & t.flags))
                return (
                  (bi = !1),
                  (function (e, t, n) {
                    switch (t.tag) {
                      case 3:
                        Ti(t), pl();
                        break;
                      case 5:
                        Xl(t);
                        break;
                      case 1:
                        za(t.type) && Ma(t);
                        break;
                      case 4:
                        Zl(t, t.stateNode.containerInfo);
                        break;
                      case 10:
                        var r = t.type._context,
                          a = t.memoizedProps.value;
                        Ca(Sl, r._currentValue), (r._currentValue = a);
                        break;
                      case 13:
                        if (null !== (r = t.memoizedState))
                          return null !== r.dehydrated
                            ? (Ca($l, 1 & $l.current), (t.flags |= 128), null)
                            : 0 !== (n & t.child.childLanes)
                            ? Di(e, t, n)
                            : (Ca($l, 1 & $l.current),
                              null !== (e = Wi(e, t, n)) ? e.sibling : null);
                        Ca($l, 1 & $l.current);
                        break;
                      case 19:
                        if (
                          ((r = 0 !== (n & t.childLanes)),
                          0 !== (128 & e.flags))
                        ) {
                          if (r) return Hi(e, t, n);
                          t.flags |= 128;
                        }
                        if (
                          (null !== (a = t.memoizedState) &&
                            ((a.rendering = null),
                            (a.tail = null),
                            (a.lastEffect = null)),
                          Ca($l, $l.current),
                          r)
                        )
                          break;
                        return null;
                      case 22:
                      case 23:
                        return (t.lanes = 0), xi(e, t, n);
                    }
                    return Wi(e, t, n);
                  })(e, t, n)
                );
              bi = 0 !== (131072 & e.flags);
            }
          else (bi = !1), al && 0 !== (1048576 & t.flags) && $a(t, Qa, t.index);
          switch (((t.lanes = 0), t.tag)) {
            case 2:
              var r = t.type;
              Ui(e, t), (e = t.pendingProps);
              var a = Aa(t, La.current);
              Tl(t, n), (a = go(null, t, r, e, a, n));
              var o = vo();
              return (
                (t.flags |= 1),
                'object' === typeof a &&
                null !== a &&
                'function' === typeof a.render &&
                void 0 === a.$$typeof
                  ? ((t.tag = 1),
                    (t.memoizedState = null),
                    (t.updateQueue = null),
                    za(r) ? ((o = !0), Ma(t)) : (o = !1),
                    (t.memoizedState =
                      null !== a.state && void 0 !== a.state ? a.state : null),
                    Ml(t),
                    (a.updater = ai),
                    (t.stateNode = a),
                    (a._reactInternals = t),
                    ui(t, r, e, n),
                    (t = Li(null, t, r, !0, o, n)))
                  : ((t.tag = 0),
                    al && o && el(t),
                    ki(null, t, a, n),
                    (t = t.child)),
                t
              );
            case 16:
              r = t.elementType;
              e: {
                switch (
                  (Ui(e, t),
                  (e = t.pendingProps),
                  (r = (a = r._init)(r._payload)),
                  (t.type = r),
                  (a = t.tag =
                    (function (e) {
                      if ('function' === typeof e) return zs(e) ? 1 : 0;
                      if (void 0 !== e && null !== e) {
                        if ((e = e.$$typeof) === L) return 11;
                        if (e === A) return 14;
                      }
                      return 2;
                    })(r)),
                  (e = ni(r, e)),
                  a)
                ) {
                  case 0:
                    t = Ci(null, t, r, e, n);
                    break e;
                  case 1:
                    t = Ni(null, t, r, e, n);
                    break e;
                  case 11:
                    t = wi(null, t, r, e, n);
                    break e;
                  case 14:
                    t = Si(null, t, r, ni(r.type, e), n);
                    break e;
                }
                throw Error(l(306, r, ''));
              }
              return t;
            case 0:
              return (
                (r = t.type),
                (a = t.pendingProps),
                Ci(e, t, r, (a = t.elementType === r ? a : ni(r, a)), n)
              );
            case 1:
              return (
                (r = t.type),
                (a = t.pendingProps),
                Ni(e, t, r, (a = t.elementType === r ? a : ni(r, a)), n)
              );
            case 3:
              e: {
                if ((Ti(t), null === e)) throw Error(l(387));
                (r = t.pendingProps),
                  (a = (o = t.memoizedState).element),
                  Dl(e, t),
                  Hl(t, r, null, n);
                var i = t.memoizedState;
                if (((r = i.element), o.isDehydrated)) {
                  if (
                    ((o = {
                      element: r,
                      isDehydrated: !1,
                      cache: i.cache,
                      pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
                      transitions: i.transitions,
                    }),
                    (t.updateQueue.baseState = o),
                    (t.memoizedState = o),
                    256 & t.flags)
                  ) {
                    t = Pi(e, t, r, n, (a = si(Error(l(423)), t)));
                    break e;
                  }
                  if (r !== a) {
                    t = Pi(e, t, r, n, (a = si(Error(l(424)), t)));
                    break e;
                  }
                  for (
                    rl = sa(t.stateNode.containerInfo.firstChild),
                      nl = t,
                      al = !0,
                      ll = null,
                      n = wl(t, null, r, n),
                      t.child = n;
                    n;

                  )
                    (n.flags = (-3 & n.flags) | 4096), (n = n.sibling);
                } else {
                  if ((pl(), r === a)) {
                    t = Wi(e, t, n);
                    break e;
                  }
                  ki(e, t, r, n);
                }
                t = t.child;
              }
              return t;
            case 5:
              return (
                Xl(t),
                null === e && sl(t),
                (r = t.type),
                (a = t.pendingProps),
                (o = null !== e ? e.memoizedProps : null),
                (i = a.children),
                na(r, a)
                  ? (i = null)
                  : null !== o && na(r, o) && (t.flags |= 32),
                Ei(e, t),
                ki(e, t, i, n),
                t.child
              );
            case 6:
              return null === e && sl(t), null;
            case 13:
              return Di(e, t, n);
            case 4:
              return (
                Zl(t, t.stateNode.containerInfo),
                (r = t.pendingProps),
                null === e ? (t.child = kl(t, null, r, n)) : ki(e, t, r, n),
                t.child
              );
            case 11:
              return (
                (r = t.type),
                (a = t.pendingProps),
                wi(e, t, r, (a = t.elementType === r ? a : ni(r, a)), n)
              );
            case 7:
              return ki(e, t, t.pendingProps, n), t.child;
            case 8:
            case 12:
              return ki(e, t, t.pendingProps.children, n), t.child;
            case 10:
              e: {
                if (
                  ((r = t.type._context),
                  (a = t.pendingProps),
                  (o = t.memoizedProps),
                  (i = a.value),
                  Ca(Sl, r._currentValue),
                  (r._currentValue = i),
                  null !== o)
                )
                  if (ir(o.value, i)) {
                    if (o.children === a.children && !Ta.current) {
                      t = Wi(e, t, n);
                      break e;
                    }
                  } else
                    for (
                      null !== (o = t.child) && (o.return = t);
                      null !== o;

                    ) {
                      var u = o.dependencies;
                      if (null !== u) {
                        i = o.child;
                        for (var s = u.firstContext; null !== s; ) {
                          if (s.context === r) {
                            if (1 === o.tag) {
                              (s = Fl(-1, n & -n)).tag = 2;
                              var c = o.updateQueue;
                              if (null !== c) {
                                var d = (c = c.shared).pending;
                                null === d
                                  ? (s.next = s)
                                  : ((s.next = d.next), (d.next = s)),
                                  (c.pending = s);
                              }
                            }
                            (o.lanes |= n),
                              null !== (s = o.alternate) && (s.lanes |= n),
                              Ll(o.return, n, t),
                              (u.lanes |= n);
                            break;
                          }
                          s = s.next;
                        }
                      } else if (10 === o.tag)
                        i = o.type === t.type ? null : o.child;
                      else if (18 === o.tag) {
                        if (null === (i = o.return)) throw Error(l(341));
                        (i.lanes |= n),
                          null !== (u = i.alternate) && (u.lanes |= n),
                          Ll(i, n, t),
                          (i = o.sibling);
                      } else i = o.child;
                      if (null !== i) i.return = o;
                      else
                        for (i = o; null !== i; ) {
                          if (i === t) {
                            i = null;
                            break;
                          }
                          if (null !== (o = i.sibling)) {
                            (o.return = i.return), (i = o);
                            break;
                          }
                          i = i.return;
                        }
                      o = i;
                    }
                ki(e, t, a.children, n), (t = t.child);
              }
              return t;
            case 9:
              return (
                (a = t.type),
                (r = t.pendingProps.children),
                Tl(t, n),
                (r = r((a = Pl(a)))),
                (t.flags |= 1),
                ki(e, t, r, n),
                t.child
              );
            case 14:
              return (
                (a = ni((r = t.type), t.pendingProps)),
                Si(e, t, r, (a = ni(r.type, a)), n)
              );
            case 15:
              return _i(e, t, t.type, t.pendingProps, n);
            case 17:
              return (
                (r = t.type),
                (a = t.pendingProps),
                (a = t.elementType === r ? a : ni(r, a)),
                Ui(e, t),
                (t.tag = 1),
                za(r) ? ((e = !0), Ma(t)) : (e = !1),
                Tl(t, n),
                oi(t, r, a),
                ui(t, r, a, n),
                Li(null, t, r, !0, e, n)
              );
            case 19:
              return Hi(e, t, n);
            case 22:
              return xi(e, t, n);
          }
          throw Error(l(156, t.tag));
        };
        var Js =
          'function' === typeof reportError
            ? reportError
            : function (e) {
                console.error(e);
              };
        function Ks(e) {
          this._internalRoot = e;
        }
        function Zs(e) {
          this._internalRoot = e;
        }
        function Gs(e) {
          return !(
            !e ||
            (1 !== e.nodeType && 9 !== e.nodeType && 11 !== e.nodeType)
          );
        }
        function Xs(e) {
          return !(
            !e ||
            (1 !== e.nodeType &&
              9 !== e.nodeType &&
              11 !== e.nodeType &&
              (8 !== e.nodeType ||
                ' react-mount-point-unstable ' !== e.nodeValue))
          );
        }
        function Ys() {}
        function $s(e, t, n, r, a) {
          var l = n._reactRootContainer;
          if (l) {
            var o = l;
            if ('function' === typeof a) {
              var i = a;
              a = function () {
                var e = Ws(o);
                i.call(e);
              };
            }
            Us(t, o, e, a);
          } else
            o = (function (e, t, n, r, a) {
              if (a) {
                if ('function' === typeof r) {
                  var l = r;
                  r = function () {
                    var e = Ws(o);
                    l.call(e);
                  };
                }
                var o = Hs(t, r, e, 0, null, !1, 0, '', Ys);
                return (
                  (e._reactRootContainer = o),
                  (e[ha] = o.current),
                  Hr(8 === e.nodeType ? e.parentNode : e),
                  cs(),
                  o
                );
              }
              for (; (a = e.lastChild); ) e.removeChild(a);
              if ('function' === typeof r) {
                var i = r;
                r = function () {
                  var e = Ws(u);
                  i.call(e);
                };
              }
              var u = Bs(e, 0, !1, null, 0, !1, 0, '', Ys);
              return (
                (e._reactRootContainer = u),
                (e[ha] = u.current),
                Hr(8 === e.nodeType ? e.parentNode : e),
                cs(function () {
                  Us(t, u, n, r);
                }),
                u
              );
            })(n, t, e, a, r);
          return Ws(o);
        }
        (Zs.prototype.render = Ks.prototype.render =
          function (e) {
            var t = this._internalRoot;
            if (null === t) throw Error(l(409));
            Us(e, t, null, null);
          }),
          (Zs.prototype.unmount = Ks.prototype.unmount =
            function () {
              var e = this._internalRoot;
              if (null !== e) {
                this._internalRoot = null;
                var t = e.containerInfo;
                cs(function () {
                  Us(null, e, null, null);
                }),
                  (t[ha] = null);
              }
            }),
          (Zs.prototype.unstable_scheduleHydration = function (e) {
            if (e) {
              var t = xt();
              e = { blockedOn: null, target: e, priority: t };
              for (
                var n = 0;
                n < jt.length && 0 !== t && t < jt[n].priority;
                n++
              );
              jt.splice(n, 0, e), 0 === n && Dt(e);
            }
          }),
          (wt = function (e) {
            switch (e.tag) {
              case 3:
                var t = e.stateNode;
                if (t.current.memoizedState.isDehydrated) {
                  var n = dt(t.pendingLanes);
                  0 !== n &&
                    (yt(t, 1 | n),
                    rs(t, Xe()),
                    0 === (6 & Lu) && ((Hu = Xe() + 500), Ha()));
                }
                break;
              case 13:
                cs(function () {
                  var t = Ol(e, 1);
                  if (null !== t) {
                    var n = es();
                    ns(t, e, 1, n);
                  }
                }),
                  Qs(e, 1);
            }
          }),
          (St = function (e) {
            if (13 === e.tag) {
              var t = Ol(e, 134217728);
              if (null !== t) ns(t, e, 134217728, es());
              Qs(e, 134217728);
            }
          }),
          (_t = function (e) {
            if (13 === e.tag) {
              var t = ts(e),
                n = Ol(e, t);
              if (null !== n) ns(n, e, t, es());
              Qs(e, t);
            }
          }),
          (xt = function () {
            return bt;
          }),
          (Et = function (e, t) {
            var n = bt;
            try {
              return (bt = e), t();
            } finally {
              bt = n;
            }
          }),
          (Se = function (e, t, n) {
            switch (t) {
              case 'input':
                if ((Y(e, n), (t = n.name), 'radio' === n.type && null != t)) {
                  for (n = e; n.parentNode; ) n = n.parentNode;
                  for (
                    n = n.querySelectorAll(
                      'input[name=' + JSON.stringify('' + t) + '][type="radio"]'
                    ),
                      t = 0;
                    t < n.length;
                    t++
                  ) {
                    var r = n[t];
                    if (r !== e && r.form === e.form) {
                      var a = wa(r);
                      if (!a) throw Error(l(90));
                      J(r), Y(r, a);
                    }
                  }
                }
                break;
              case 'textarea':
                le(e, n);
                break;
              case 'select':
                null != (t = n.value) && ne(e, !!n.multiple, t, !1);
            }
          }),
          (Le = ss),
          (Te = cs);
        var ec = {
            usingClientEntryPoint: !1,
            Events: [ba, ka, wa, Ce, Ne, ss],
          },
          tc = {
            findFiberByHostInstance: ya,
            bundleType: 0,
            version: '18.3.1',
            rendererPackageName: 'react-dom',
          },
          nc = {
            bundleType: tc.bundleType,
            version: tc.version,
            rendererPackageName: tc.rendererPackageName,
            rendererConfig: tc.rendererConfig,
            overrideHookState: null,
            overrideHookStateDeletePath: null,
            overrideHookStateRenamePath: null,
            overrideProps: null,
            overridePropsDeletePath: null,
            overridePropsRenamePath: null,
            setErrorHandler: null,
            setSuspenseHandler: null,
            scheduleUpdate: null,
            currentDispatcherRef: k.ReactCurrentDispatcher,
            findHostInstanceByFiber: function (e) {
              return null === (e = qe(e)) ? null : e.stateNode;
            },
            findFiberByHostInstance:
              tc.findFiberByHostInstance ||
              function () {
                return null;
              },
            findHostInstancesForRefresh: null,
            scheduleRefresh: null,
            scheduleRoot: null,
            setRefreshHandler: null,
            getCurrentFiber: null,
            reconcilerVersion: '18.3.1-next-f1338f8080-20240426',
          };
        if ('undefined' !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
          var rc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
          if (!rc.isDisabled && rc.supportsFiber)
            try {
              (at = rc.inject(nc)), (lt = rc);
            } catch (ce) {}
        }
        (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ec),
          (t.createPortal = function (e, t) {
            var n =
              2 < arguments.length && void 0 !== arguments[2]
                ? arguments[2]
                : null;
            if (!Gs(t)) throw Error(l(200));
            return (function (e, t, n) {
              var r =
                3 < arguments.length && void 0 !== arguments[3]
                  ? arguments[3]
                  : null;
              return {
                $$typeof: S,
                key: null == r ? null : '' + r,
                children: e,
                containerInfo: t,
                implementation: n,
              };
            })(e, t, null, n);
          }),
          (t.createRoot = function (e, t) {
            if (!Gs(e)) throw Error(l(299));
            var n = !1,
              r = '',
              a = Js;
            return (
              null !== t &&
                void 0 !== t &&
                (!0 === t.unstable_strictMode && (n = !0),
                void 0 !== t.identifierPrefix && (r = t.identifierPrefix),
                void 0 !== t.onRecoverableError && (a = t.onRecoverableError)),
              (t = Bs(e, 1, !1, null, 0, n, 0, r, a)),
              (e[ha] = t.current),
              Hr(8 === e.nodeType ? e.parentNode : e),
              new Ks(t)
            );
          }),
          (t.findDOMNode = function (e) {
            if (null == e) return null;
            if (1 === e.nodeType) return e;
            var t = e._reactInternals;
            if (void 0 === t) {
              if ('function' === typeof e.render) throw Error(l(188));
              throw ((e = Object.keys(e).join(',')), Error(l(268, e)));
            }
            return (e = null === (e = qe(t)) ? null : e.stateNode);
          }),
          (t.flushSync = function (e) {
            return cs(e);
          }),
          (t.hydrate = function (e, t, n) {
            if (!Xs(t)) throw Error(l(200));
            return $s(null, e, t, !0, n);
          }),
          (t.hydrateRoot = function (e, t, n) {
            if (!Gs(e)) throw Error(l(405));
            var r = (null != n && n.hydratedSources) || null,
              a = !1,
              o = '',
              i = Js;
            if (
              (null !== n &&
                void 0 !== n &&
                (!0 === n.unstable_strictMode && (a = !0),
                void 0 !== n.identifierPrefix && (o = n.identifierPrefix),
                void 0 !== n.onRecoverableError && (i = n.onRecoverableError)),
              (t = Hs(t, null, e, 1, null != n ? n : null, a, 0, o, i)),
              (e[ha] = t.current),
              Hr(e),
              r)
            )
              for (e = 0; e < r.length; e++)
                (a = (a = (n = r[e])._getVersion)(n._source)),
                  null == t.mutableSourceEagerHydrationData
                    ? (t.mutableSourceEagerHydrationData = [n, a])
                    : t.mutableSourceEagerHydrationData.push(n, a);
            return new Zs(t);
          }),
          (t.render = function (e, t, n) {
            if (!Xs(t)) throw Error(l(200));
            return $s(null, e, t, !1, n);
          }),
          (t.unmountComponentAtNode = function (e) {
            if (!Xs(e)) throw Error(l(40));
            return (
              !!e._reactRootContainer &&
              (cs(function () {
                $s(null, null, e, !1, function () {
                  (e._reactRootContainer = null), (e[ha] = null);
                });
              }),
              !0)
            );
          }),
          (t.unstable_batchedUpdates = ss),
          (t.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
            if (!Xs(n)) throw Error(l(200));
            if (null == e || void 0 === e._reactInternals) throw Error(l(38));
            return $s(e, t, n, !1, r);
          }),
          (t.version = '18.3.1-next-f1338f8080-20240426');
      },
      391: (e, t, n) => {
        'use strict';
        var r = n(950);
        (t.createRoot = r.createRoot), (t.hydrateRoot = r.hydrateRoot);
      },
      950: (e, t, n) => {
        'use strict';
        !(function e() {
          if (
            'undefined' !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
            'function' === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
          )
            try {
              __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e);
            } catch (t) {
              console.error(t);
            }
        })(),
          (e.exports = n(730));
      },
      686: (e, t, n) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 });
        var r =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            },
          a = i(n(173)),
          l = n(43),
          o = i(l);
        function i(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var u = {
            bgColor: a.default.oneOfType([a.default.object, a.default.string])
              .isRequired,
            bgD: a.default.string.isRequired,
            fgColor: a.default.oneOfType([a.default.object, a.default.string])
              .isRequired,
            fgD: a.default.string.isRequired,
            size: a.default.number.isRequired,
            title: a.default.string,
            viewBoxSize: a.default.number.isRequired,
            xmlns: a.default.string,
          },
          s = (0, l.forwardRef)(function (e, t) {
            var n = e.bgColor,
              a = e.bgD,
              l = e.fgD,
              i = e.fgColor,
              u = e.size,
              s = e.title,
              c = e.viewBoxSize,
              d = e.xmlns,
              f = void 0 === d ? 'http://www.w3.org/2000/svg' : d,
              p = (function (e, t) {
                var n = {};
                for (var r in e)
                  t.indexOf(r) >= 0 ||
                    (Object.prototype.hasOwnProperty.call(e, r) &&
                      (n[r] = e[r]));
                return n;
              })(e, [
                'bgColor',
                'bgD',
                'fgD',
                'fgColor',
                'size',
                'title',
                'viewBoxSize',
                'xmlns',
              ]);
            return o.default.createElement(
              'svg',
              r({}, p, {
                height: u,
                ref: t,
                viewBox: '0 0 ' + c + ' ' + c,
                width: u,
                xmlns: f,
              }),
              s ? o.default.createElement('title', null, s) : null,
              o.default.createElement('path', { d: a, fill: n }),
              o.default.createElement('path', { d: l, fill: i })
            );
          });
        (s.displayName = 'QRCodeSvg'), (s.propTypes = u), (t.default = s);
      },
      245: (e, t, n) => {
        'use strict';
        var r =
            Object.assign ||
            function (e) {
              for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                  Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
              }
              return e;
            },
          a = c(n(173)),
          l = c(n(742)),
          o = c(n(612)),
          i = n(43),
          u = c(i),
          s = c(n(686));
        function c(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var d = {
            bgColor: a.default.oneOfType([a.default.object, a.default.string]),
            fgColor: a.default.oneOfType([a.default.object, a.default.string]),
            level: a.default.string,
            size: a.default.number,
            value: a.default.string.isRequired,
          },
          f = (0, i.forwardRef)(function (e, t) {
            var n = e.bgColor,
              a = void 0 === n ? '#FFFFFF' : n,
              i = e.fgColor,
              c = void 0 === i ? '#000000' : i,
              d = e.level,
              f = void 0 === d ? 'L' : d,
              p = e.size,
              h = void 0 === p ? 256 : p,
              m = e.value,
              g = (function (e, t) {
                var n = {};
                for (var r in e)
                  t.indexOf(r) >= 0 ||
                    (Object.prototype.hasOwnProperty.call(e, r) &&
                      (n[r] = e[r]));
                return n;
              })(e, ['bgColor', 'fgColor', 'level', 'size', 'value']),
              v = new o.default(-1, l.default[f]);
            v.addData(m), v.make();
            var y = v.modules;
            return u.default.createElement(
              s.default,
              r({}, g, {
                bgColor: a,
                bgD: y
                  .map(function (e, t) {
                    return e
                      .map(function (e, n) {
                        return e
                          ? ''
                          : 'M ' + n + ' ' + t + ' l 1 0 0 1 -1 0 Z';
                      })
                      .join(' ');
                  })
                  .join(' '),
                fgColor: c,
                fgD: y
                  .map(function (e, t) {
                    return e
                      .map(function (e, n) {
                        return e
                          ? 'M ' + n + ' ' + t + ' l 1 0 0 1 -1 0 Z'
                          : '';
                      })
                      .join(' ');
                  })
                  .join(' '),
                ref: t,
                size: h,
                viewBoxSize: y.length,
              })
            );
          });
        (f.displayName = 'QRCode'), (f.propTypes = d), (t.Ay = f);
      },
      153: (e, t, n) => {
        'use strict';
        var r = n(43),
          a = Symbol.for('react.element'),
          l = Symbol.for('react.fragment'),
          o = Object.prototype.hasOwnProperty,
          i =
            r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
              .ReactCurrentOwner,
          u = { key: !0, ref: !0, __self: !0, __source: !0 };
        function s(e, t, n) {
          var r,
            l = {},
            s = null,
            c = null;
          for (r in (void 0 !== n && (s = '' + n),
          void 0 !== t.key && (s = '' + t.key),
          void 0 !== t.ref && (c = t.ref),
          t))
            o.call(t, r) && !u.hasOwnProperty(r) && (l[r] = t[r]);
          if (e && e.defaultProps)
            for (r in (t = e.defaultProps)) void 0 === l[r] && (l[r] = t[r]);
          return {
            $$typeof: a,
            type: e,
            key: s,
            ref: c,
            props: l,
            _owner: i.current,
          };
        }
        (t.Fragment = l), (t.jsx = s), (t.jsxs = s);
      },
      202: (e, t) => {
        'use strict';
        var n = Symbol.for('react.element'),
          r = Symbol.for('react.portal'),
          a = Symbol.for('react.fragment'),
          l = Symbol.for('react.strict_mode'),
          o = Symbol.for('react.profiler'),
          i = Symbol.for('react.provider'),
          u = Symbol.for('react.context'),
          s = Symbol.for('react.forward_ref'),
          c = Symbol.for('react.suspense'),
          d = Symbol.for('react.memo'),
          f = Symbol.for('react.lazy'),
          p = Symbol.iterator;
        var h = {
            isMounted: function () {
              return !1;
            },
            enqueueForceUpdate: function () {},
            enqueueReplaceState: function () {},
            enqueueSetState: function () {},
          },
          m = Object.assign,
          g = {};
        function v(e, t, n) {
          (this.props = e),
            (this.context = t),
            (this.refs = g),
            (this.updater = n || h);
        }
        function y() {}
        function b(e, t, n) {
          (this.props = e),
            (this.context = t),
            (this.refs = g),
            (this.updater = n || h);
        }
        (v.prototype.isReactComponent = {}),
          (v.prototype.setState = function (e, t) {
            if ('object' !== typeof e && 'function' !== typeof e && null != e)
              throw Error(
                'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'
              );
            this.updater.enqueueSetState(this, e, t, 'setState');
          }),
          (v.prototype.forceUpdate = function (e) {
            this.updater.enqueueForceUpdate(this, e, 'forceUpdate');
          }),
          (y.prototype = v.prototype);
        var k = (b.prototype = new y());
        (k.constructor = b), m(k, v.prototype), (k.isPureReactComponent = !0);
        var w = Array.isArray,
          S = Object.prototype.hasOwnProperty,
          _ = { current: null },
          x = { key: !0, ref: !0, __self: !0, __source: !0 };
        function E(e, t, r) {
          var a,
            l = {},
            o = null,
            i = null;
          if (null != t)
            for (a in (void 0 !== t.ref && (i = t.ref),
            void 0 !== t.key && (o = '' + t.key),
            t))
              S.call(t, a) && !x.hasOwnProperty(a) && (l[a] = t[a]);
          var u = arguments.length - 2;
          if (1 === u) l.children = r;
          else if (1 < u) {
            for (var s = Array(u), c = 0; c < u; c++) s[c] = arguments[c + 2];
            l.children = s;
          }
          if (e && e.defaultProps)
            for (a in (u = e.defaultProps)) void 0 === l[a] && (l[a] = u[a]);
          return {
            $$typeof: n,
            type: e,
            key: o,
            ref: i,
            props: l,
            _owner: _.current,
          };
        }
        function C(e) {
          return 'object' === typeof e && null !== e && e.$$typeof === n;
        }
        var N = /\/+/g;
        function L(e, t) {
          return 'object' === typeof e && null !== e && null != e.key
            ? (function (e) {
                var t = { '=': '=0', ':': '=2' };
                return (
                  '$' +
                  e.replace(/[=:]/g, function (e) {
                    return t[e];
                  })
                );
              })('' + e.key)
            : t.toString(36);
        }
        function T(e, t, a, l, o) {
          var i = typeof e;
          ('undefined' !== i && 'boolean' !== i) || (e = null);
          var u = !1;
          if (null === e) u = !0;
          else
            switch (i) {
              case 'string':
              case 'number':
                u = !0;
                break;
              case 'object':
                switch (e.$$typeof) {
                  case n:
                  case r:
                    u = !0;
                }
            }
          if (u)
            return (
              (o = o((u = e))),
              (e = '' === l ? '.' + L(u, 0) : l),
              w(o)
                ? ((a = ''),
                  null != e && (a = e.replace(N, '$&/') + '/'),
                  T(o, t, a, '', function (e) {
                    return e;
                  }))
                : null != o &&
                  (C(o) &&
                    (o = (function (e, t) {
                      return {
                        $$typeof: n,
                        type: e.type,
                        key: t,
                        ref: e.ref,
                        props: e.props,
                        _owner: e._owner,
                      };
                    })(
                      o,
                      a +
                        (!o.key || (u && u.key === o.key)
                          ? ''
                          : ('' + o.key).replace(N, '$&/') + '/') +
                        e
                    )),
                  t.push(o)),
              1
            );
          if (((u = 0), (l = '' === l ? '.' : l + ':'), w(e)))
            for (var s = 0; s < e.length; s++) {
              var c = l + L((i = e[s]), s);
              u += T(i, t, a, c, o);
            }
          else if (
            ((c = (function (e) {
              return null === e || 'object' !== typeof e
                ? null
                : 'function' === typeof (e = (p && e[p]) || e['@@iterator'])
                ? e
                : null;
            })(e)),
            'function' === typeof c)
          )
            for (e = c.call(e), s = 0; !(i = e.next()).done; )
              u += T((i = i.value), t, a, (c = l + L(i, s++)), o);
          else if ('object' === i)
            throw (
              ((t = String(e)),
              Error(
                'Objects are not valid as a React child (found: ' +
                  ('[object Object]' === t
                    ? 'object with keys {' + Object.keys(e).join(', ') + '}'
                    : t) +
                  '). If you meant to render a collection of children, use an array instead.'
              ))
            );
          return u;
        }
        function P(e, t, n) {
          if (null == e) return e;
          var r = [],
            a = 0;
          return (
            T(e, r, '', '', function (e) {
              return t.call(n, e, a++);
            }),
            r
          );
        }
        function A(e) {
          if (-1 === e._status) {
            var t = e._result;
            (t = t()).then(
              function (t) {
                (0 !== e._status && -1 !== e._status) ||
                  ((e._status = 1), (e._result = t));
              },
              function (t) {
                (0 !== e._status && -1 !== e._status) ||
                  ((e._status = 2), (e._result = t));
              }
            ),
              -1 === e._status && ((e._status = 0), (e._result = t));
          }
          if (1 === e._status) return e._result.default;
          throw e._result;
        }
        var z = { current: null },
          j = { transition: null },
          O = {
            ReactCurrentDispatcher: z,
            ReactCurrentBatchConfig: j,
            ReactCurrentOwner: _,
          };
        function R() {
          throw Error(
            'act(...) is not supported in production builds of React.'
          );
        }
        (t.Children = {
          map: P,
          forEach: function (e, t, n) {
            P(
              e,
              function () {
                t.apply(this, arguments);
              },
              n
            );
          },
          count: function (e) {
            var t = 0;
            return (
              P(e, function () {
                t++;
              }),
              t
            );
          },
          toArray: function (e) {
            return (
              P(e, function (e) {
                return e;
              }) || []
            );
          },
          only: function (e) {
            if (!C(e))
              throw Error(
                'React.Children.only expected to receive a single React element child.'
              );
            return e;
          },
        }),
          (t.Component = v),
          (t.Fragment = a),
          (t.Profiler = o),
          (t.PureComponent = b),
          (t.StrictMode = l),
          (t.Suspense = c),
          (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = O),
          (t.act = R),
          (t.cloneElement = function (e, t, r) {
            if (null === e || void 0 === e)
              throw Error(
                'React.cloneElement(...): The argument must be a React element, but you passed ' +
                  e +
                  '.'
              );
            var a = m({}, e.props),
              l = e.key,
              o = e.ref,
              i = e._owner;
            if (null != t) {
              if (
                (void 0 !== t.ref && ((o = t.ref), (i = _.current)),
                void 0 !== t.key && (l = '' + t.key),
                e.type && e.type.defaultProps)
              )
                var u = e.type.defaultProps;
              for (s in t)
                S.call(t, s) &&
                  !x.hasOwnProperty(s) &&
                  (a[s] = void 0 === t[s] && void 0 !== u ? u[s] : t[s]);
            }
            var s = arguments.length - 2;
            if (1 === s) a.children = r;
            else if (1 < s) {
              u = Array(s);
              for (var c = 0; c < s; c++) u[c] = arguments[c + 2];
              a.children = u;
            }
            return {
              $$typeof: n,
              type: e.type,
              key: l,
              ref: o,
              props: a,
              _owner: i,
            };
          }),
          (t.createContext = function (e) {
            return (
              ((e = {
                $$typeof: u,
                _currentValue: e,
                _currentValue2: e,
                _threadCount: 0,
                Provider: null,
                Consumer: null,
                _defaultValue: null,
                _globalName: null,
              }).Provider = { $$typeof: i, _context: e }),
              (e.Consumer = e)
            );
          }),
          (t.createElement = E),
          (t.createFactory = function (e) {
            var t = E.bind(null, e);
            return (t.type = e), t;
          }),
          (t.createRef = function () {
            return { current: null };
          }),
          (t.forwardRef = function (e) {
            return { $$typeof: s, render: e };
          }),
          (t.isValidElement = C),
          (t.lazy = function (e) {
            return {
              $$typeof: f,
              _payload: { _status: -1, _result: e },
              _init: A,
            };
          }),
          (t.memo = function (e, t) {
            return { $$typeof: d, type: e, compare: void 0 === t ? null : t };
          }),
          (t.startTransition = function (e) {
            var t = j.transition;
            j.transition = {};
            try {
              e();
            } finally {
              j.transition = t;
            }
          }),
          (t.unstable_act = R),
          (t.useCallback = function (e, t) {
            return z.current.useCallback(e, t);
          }),
          (t.useContext = function (e) {
            return z.current.useContext(e);
          }),
          (t.useDebugValue = function () {}),
          (t.useDeferredValue = function (e) {
            return z.current.useDeferredValue(e);
          }),
          (t.useEffect = function (e, t) {
            return z.current.useEffect(e, t);
          }),
          (t.useId = function () {
            return z.current.useId();
          }),
          (t.useImperativeHandle = function (e, t, n) {
            return z.current.useImperativeHandle(e, t, n);
          }),
          (t.useInsertionEffect = function (e, t) {
            return z.current.useInsertionEffect(e, t);
          }),
          (t.useLayoutEffect = function (e, t) {
            return z.current.useLayoutEffect(e, t);
          }),
          (t.useMemo = function (e, t) {
            return z.current.useMemo(e, t);
          }),
          (t.useReducer = function (e, t, n) {
            return z.current.useReducer(e, t, n);
          }),
          (t.useRef = function (e) {
            return z.current.useRef(e);
          }),
          (t.useState = function (e) {
            return z.current.useState(e);
          }),
          (t.useSyncExternalStore = function (e, t, n) {
            return z.current.useSyncExternalStore(e, t, n);
          }),
          (t.useTransition = function () {
            return z.current.useTransition();
          }),
          (t.version = '18.3.1');
      },
      43: (e, t, n) => {
        'use strict';
        e.exports = n(202);
      },
      579: (e, t, n) => {
        'use strict';
        e.exports = n(153);
      },
      234: (e, t) => {
        'use strict';
        function n(e, t) {
          var n = e.length;
          e.push(t);
          e: for (; 0 < n; ) {
            var r = (n - 1) >>> 1,
              a = e[r];
            if (!(0 < l(a, t))) break e;
            (e[r] = t), (e[n] = a), (n = r);
          }
        }
        function r(e) {
          return 0 === e.length ? null : e[0];
        }
        function a(e) {
          if (0 === e.length) return null;
          var t = e[0],
            n = e.pop();
          if (n !== t) {
            e[0] = n;
            e: for (var r = 0, a = e.length, o = a >>> 1; r < o; ) {
              var i = 2 * (r + 1) - 1,
                u = e[i],
                s = i + 1,
                c = e[s];
              if (0 > l(u, n))
                s < a && 0 > l(c, u)
                  ? ((e[r] = c), (e[s] = n), (r = s))
                  : ((e[r] = u), (e[i] = n), (r = i));
              else {
                if (!(s < a && 0 > l(c, n))) break e;
                (e[r] = c), (e[s] = n), (r = s);
              }
            }
          }
          return t;
        }
        function l(e, t) {
          var n = e.sortIndex - t.sortIndex;
          return 0 !== n ? n : e.id - t.id;
        }
        if (
          'object' === typeof performance &&
          'function' === typeof performance.now
        ) {
          var o = performance;
          t.unstable_now = function () {
            return o.now();
          };
        } else {
          var i = Date,
            u = i.now();
          t.unstable_now = function () {
            return i.now() - u;
          };
        }
        var s = [],
          c = [],
          d = 1,
          f = null,
          p = 3,
          h = !1,
          m = !1,
          g = !1,
          v = 'function' === typeof setTimeout ? setTimeout : null,
          y = 'function' === typeof clearTimeout ? clearTimeout : null,
          b = 'undefined' !== typeof setImmediate ? setImmediate : null;
        function k(e) {
          for (var t = r(c); null !== t; ) {
            if (null === t.callback) a(c);
            else {
              if (!(t.startTime <= e)) break;
              a(c), (t.sortIndex = t.expirationTime), n(s, t);
            }
            t = r(c);
          }
        }
        function w(e) {
          if (((g = !1), k(e), !m))
            if (null !== r(s)) (m = !0), j(S);
            else {
              var t = r(c);
              null !== t && O(w, t.startTime - e);
            }
        }
        function S(e, n) {
          (m = !1), g && ((g = !1), y(C), (C = -1)), (h = !0);
          var l = p;
          try {
            for (
              k(n), f = r(s);
              null !== f && (!(f.expirationTime > n) || (e && !T()));

            ) {
              var o = f.callback;
              if ('function' === typeof o) {
                (f.callback = null), (p = f.priorityLevel);
                var i = o(f.expirationTime <= n);
                (n = t.unstable_now()),
                  'function' === typeof i
                    ? (f.callback = i)
                    : f === r(s) && a(s),
                  k(n);
              } else a(s);
              f = r(s);
            }
            if (null !== f) var u = !0;
            else {
              var d = r(c);
              null !== d && O(w, d.startTime - n), (u = !1);
            }
            return u;
          } finally {
            (f = null), (p = l), (h = !1);
          }
        }
        'undefined' !== typeof navigator &&
          void 0 !== navigator.scheduling &&
          void 0 !== navigator.scheduling.isInputPending &&
          navigator.scheduling.isInputPending.bind(navigator.scheduling);
        var _,
          x = !1,
          E = null,
          C = -1,
          N = 5,
          L = -1;
        function T() {
          return !(t.unstable_now() - L < N);
        }
        function P() {
          if (null !== E) {
            var e = t.unstable_now();
            L = e;
            var n = !0;
            try {
              n = E(!0, e);
            } finally {
              n ? _() : ((x = !1), (E = null));
            }
          } else x = !1;
        }
        if ('function' === typeof b)
          _ = function () {
            b(P);
          };
        else if ('undefined' !== typeof MessageChannel) {
          var A = new MessageChannel(),
            z = A.port2;
          (A.port1.onmessage = P),
            (_ = function () {
              z.postMessage(null);
            });
        } else
          _ = function () {
            v(P, 0);
          };
        function j(e) {
          (E = e), x || ((x = !0), _());
        }
        function O(e, n) {
          C = v(function () {
            e(t.unstable_now());
          }, n);
        }
        (t.unstable_IdlePriority = 5),
          (t.unstable_ImmediatePriority = 1),
          (t.unstable_LowPriority = 4),
          (t.unstable_NormalPriority = 3),
          (t.unstable_Profiling = null),
          (t.unstable_UserBlockingPriority = 2),
          (t.unstable_cancelCallback = function (e) {
            e.callback = null;
          }),
          (t.unstable_continueExecution = function () {
            m || h || ((m = !0), j(S));
          }),
          (t.unstable_forceFrameRate = function (e) {
            0 > e || 125 < e
              ? console.error(
                  'forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported'
                )
              : (N = 0 < e ? Math.floor(1e3 / e) : 5);
          }),
          (t.unstable_getCurrentPriorityLevel = function () {
            return p;
          }),
          (t.unstable_getFirstCallbackNode = function () {
            return r(s);
          }),
          (t.unstable_next = function (e) {
            switch (p) {
              case 1:
              case 2:
              case 3:
                var t = 3;
                break;
              default:
                t = p;
            }
            var n = p;
            p = t;
            try {
              return e();
            } finally {
              p = n;
            }
          }),
          (t.unstable_pauseExecution = function () {}),
          (t.unstable_requestPaint = function () {}),
          (t.unstable_runWithPriority = function (e, t) {
            switch (e) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                e = 3;
            }
            var n = p;
            p = e;
            try {
              return t();
            } finally {
              p = n;
            }
          }),
          (t.unstable_scheduleCallback = function (e, a, l) {
            var o = t.unstable_now();
            switch (
              ('object' === typeof l && null !== l
                ? (l = 'number' === typeof (l = l.delay) && 0 < l ? o + l : o)
                : (l = o),
              e)
            ) {
              case 1:
                var i = -1;
                break;
              case 2:
                i = 250;
                break;
              case 5:
                i = 1073741823;
                break;
              case 4:
                i = 1e4;
                break;
              default:
                i = 5e3;
            }
            return (
              (e = {
                id: d++,
                callback: a,
                priorityLevel: e,
                startTime: l,
                expirationTime: (i = l + i),
                sortIndex: -1,
              }),
              l > o
                ? ((e.sortIndex = l),
                  n(c, e),
                  null === r(s) &&
                    e === r(c) &&
                    (g ? (y(C), (C = -1)) : (g = !0), O(w, l - o)))
                : ((e.sortIndex = i), n(s, e), m || h || ((m = !0), j(S))),
              e
            );
          }),
          (t.unstable_shouldYield = T),
          (t.unstable_wrapCallback = function (e) {
            var t = p;
            return function () {
              var n = p;
              p = t;
              try {
                return e.apply(this, arguments);
              } finally {
                p = n;
              }
            };
          });
      },
      853: (e, t, n) => {
        'use strict';
        e.exports = n(234);
      },
    },
    t = {};
  function n(r) {
    var a = t[r];
    if (void 0 !== a) return a.exports;
    var l = (t[r] = { exports: {} });
    return e[r](l, l.exports, n), l.exports;
  }
  (n.p = ''),
    (() => {
      'use strict';
      var e = n(43),
        t = n(391);
      const r = (e, t, n) => (e > n ? n : e < t ? t : e);
      var a = n(579);
      function l() {
        return (0, a.jsx)('div', { id: 'radial-gradient', ref: o });
      }
      function o(e) {
        let t = -10,
          n = -10,
          a = 0,
          l = 0,
          o = 1,
          i = 1;
        const u = -20;
        function s() {
          (a = 0.4 + Math.random() / 5), (l = 0.2 + Math.random() / 5);
        }
        s(),
          (function c() {
            (t += a * o),
              (n += l * i),
              (t > 90 || t < u) && ((t = r(t, u, 90)), (o *= -1), s()),
              (n > 90 || n < u) && ((n = r(n, u, 90)), (i *= -1), s()),
              (e.style.cssText = `left: ${t}%; top: ${n}%;`),
              requestAnimationFrame(c);
          })();
      }
      const i = n.p + 'static/media/adi.c1ff3d7e3deb57cc4443.png';
      function u(e) {
        return (0, a.jsx)('div', {
          id: 'header',
          children: (0, a.jsx)('img', { id: 'logo', src: i, alt: '' }),
        });
      }
      var s = n(245);
      const c = JSON.parse(
          '{"country":"Albania","locale":"sq-AL","licenc\xeb":"Licenca e aksesit publik","handler_name":"Emri i mbajt\xebsit","dog_name":"Emri i qenit t\xeb sh\xebrbimit","certifikuar":"Ekipi i certifikuar","skadimi":"Skadimi","dog_breed":"Raca dhe ngjyra e qenit","dog_microchip":"Mikro\xe7ip qeni","dog_service":"Ofrohet sh\xebrbimi i qenve","test_date":"Data e testimit t\xeb aksesit publik","registration_num":"Numri i regjistrimit","handler_address":"Adresa e mbajt\xebsit","handler_phone":"Numri i telefonit t\xeb mbajt\xebsit"}'
        ),
        d = JSON.parse(
          '{"country":"Austria","locale":"de-AT","license":"Lizenz f\xfcr \xf6ffentlichen Zugriff","handler_name":"Name des Hundef\xfchrers","dog_name":"Name des Servicehundes","certified":"Zertifiziertes Team","expiration":"Ablaufdatum","dog_breed":"Hunderasse & -farbe","dog_microchip":"Hunde-Mikrochip","dog_service":"Erbrachter Hundeservice","test_date":"Datum des \xf6ffentlichen Zugriffstests","registration_num":"Registrierungsnummer","handler_address":"Adresse des Hundef\xfchrers","handler_phone":"Telefonnummer des Hundef\xfchrers"}'
        ),
        f = JSON.parse(
          '{"country":"Australia","locale":"en-AU","url":"https://assistancedogsinternational.org/resources/public-access-laws-australia-new-zealand/"}'
        ),
        p = JSON.parse(
          '{"country":"Belgium","locale":"nl-BE","license":"Openbare toegangslicentie","handler_name":"Naam van de handler","dog_name":"Naam van de servicehond","certified":"Gecertificeerd team","expiration":"Vervaldatum","dog_breed":"Hondenras en kleur","dog_microchip":"Microchip voor hond","dog_service":"Hondenservice verleend","test_date":"Datum openbare toegangstest","registration_num":"Registratienummer","handler_address":"Adres van de handler","handler_phone":"Telefoonnummer van de handler"}'
        ),
        h = JSON.parse(
          '{"country":"Bulgaria","locale":"bg-BG","license":"\u041b\u0438\u0446\u0435\u043d\u0437 \u0437\u0430 \u043f\u0443\u0431\u043b\u0438\u0447\u0435\u043d \u0434\u043e\u0441\u0442\u044a\u043f","handler_name":"\u0418\u043c\u0435 \u043d\u0430 \u043c\u0430\u043d\u0438\u043f\u0443\u043b\u0430\u0442\u043e\u0440\u0430","dog_name":"\u0418\u043c\u0435 \u043d\u0430 \u0441\u043b\u0443\u0436\u0435\u0431\u043d\u043e \u043a\u0443\u0447\u0435","certified":"\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u0446\u0438\u0440\u0430\u043d \u0435\u043a\u0438\u043f","expiration":"\u0418\u0437\u0442\u0438\u0447\u0430\u043d\u0435","dog_breed":"\u041f\u043e\u0440\u043e\u0434\u0430 \u0438 \u0446\u0432\u044f\u0442 \u043d\u0430 \u043a\u0443\u0447\u0435","dog_microchip":"\u041c\u0438\u043a\u0440\u043e\u0447\u0438\u043f \u0437\u0430 \u043a\u0443\u0447\u0435\u0442\u0430","dog_service":"\u041e\u0441\u0438\u0433\u0443\u0440\u0435\u043d\u0430 \u0443\u0441\u043b\u0443\u0433\u0430 \u0437\u0430 \u043a\u0443\u0447\u0435\u0442\u0430","test_date":"\u0414\u0430\u0442\u0430 \u043d\u0430 \u0442\u0435\u0441\u0442\u0430 \u0437\u0430 \u043f\u0443\u0431\u043b\u0438\u0447\u0435\u043d \u0434\u043e\u0441\u0442\u044a\u043f","registration_num":"\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u043e\u043d\u0435\u043d \u043d\u043e\u043c\u0435\u0440","handler_address":"\u0410\u0434\u0440\u0435\u0441 \u043d\u0430 \u043c\u0430\u043d\u0438\u043f\u0443\u043b\u0430\u0442\u043e\u0440\u0430","handler_phone":"\u0422\u0435\u043b\u0435\u0444\u043e\u043d\u0435\u043d \u043d\u043e\u043c\u0435\u0440 \u043d\u0430 \u043c\u0430\u043d\u0438\u043f\u0443\u043b\u0430\u0442\u043e\u0440\u0430"}'
        ),
        m = JSON.parse('{"country":"Bahamas","locale":"en-BS"}'),
        g = JSON.parse(
          '{"country":"Canada","locale":"en-CA","url":"https://assistancedogsinternational.org/resources/public-access-laws-canada/"}'
        ),
        v = JSON.parse(
          '{"country":"Switzerland","locale":"de-CH","license":"Lizenz f\xfcr \xf6ffentlichen Zugang","handler_name":"Name des Hundef\xfchrers","dog_name":"Name des Diensthundes","certified":"Zertifiziertes Team","expiration":"Ablauf","dog_breed":"Hunderasse & -farbe","dog_microchip":"Hunde-Mikrochip","dog_service":"Dienstleistung f\xfcr Hunde erbracht","test_date":"Datum des \xf6ffentlichen Zugangstests","registration_num":"Registrierungsnummer","handler_address":"Adresse des Hundef\xfchrers","handler_phone":"Telefonnummer des Hundef\xfchrers"}'
        ),
        y = JSON.parse(
          '{"country":"China","locale":"zh","license":"\u516c\u5171\u8bbf\u95ee\u8bb8\u53ef\u8bc1","handler_name":"\u5904\u7406\u4eba\u5458\u59d3\u540d","dog_name":"\u670d\u52a1\u72ac\u540d\u79f0","certified":"\u8ba4\u8bc1\u56e2\u961f","expiration":"\u5230\u671f","dog_breed":"\u72ac\u79cd\u4e0e\u989c\u8272","dog_microchip":"\u72ac\u5fae\u82af\u7247","dog_service":"\u63d0\u4f9b\u7684\u72ac\u670d\u52a1","test_date":"\u516c\u5171\u8bbf\u95ee\u6d4b\u8bd5\u65e5\u671f","registration_num":"\u6ce8\u518c\u53f7","handler_address":"\u5904\u7406\u4eba\u5458\u5730\u5740","handler_phone":"\u5904\u7406\u4eba\u5458\u7535\u8bdd\u53f7\u7801"}'
        ),
        b = JSON.parse(
          '{"country":"Cyprus","locale":"el-CY","\u03ac\u03b4\u03b5\u03b9\u03b1":"\u0386\u03b4\u03b5\u03b9\u03b1 \u03b4\u03b7\u03bc\u03cc\u03c3\u03b9\u03b1\u03c2 \u03c0\u03c1\u03cc\u03c3\u03b2\u03b1\u03c3\u03b7\u03c2","handler_name":"\u038c\u03bd\u03bf\u03bc\u03b1 \u03c7\u03b5\u03b9\u03c1\u03b9\u03c3\u03c4\u03ae","dog_name":"Service Dog Name","certified":"Certified Team","\u03bb\u03ae\u03be\u03b7":"\u039b\u03ae\u03be\u03b7","dog_breed":"Dog Breed & Color","dog_microchip":"\u039c\u03b9\u03ba\u03c1\u03bf\u03c4\u03c3\u03af\u03c0 \u03c3\u03ba\u03cd\u03bb\u03bf\u03c5","dog_service":"\u03a0\u03b1\u03c1\u03ad\u03c7\u03b5\u03c4\u03b1\u03b9 \u03c5\u03c0\u03b7\u03c1\u03b5\u03c3\u03af\u03b1 \u03b3\u03b9\u03b1 \u03c3\u03ba\u03cd\u03bb\u03bf\u03c5\u03c2","test_date":"\u0397\u03bc\u03b5\u03c1\u03bf\u03bc\u03b7\u03bd\u03af\u03b1 \u03b4\u03bf\u03ba\u03b9\u03bc\u03ae\u03c2 \u03b4\u03b7\u03bc\u03cc\u03c3\u03b9\u03b1\u03c2 \u03c0\u03c1\u03cc\u03c3\u03b2\u03b1\u03c3\u03b7\u03c2","registration_num":"\u0391\u03c1\u03b9\u03b8\u03bc\u03cc\u03c2 \u03b5\u03b3\u03b3\u03c1\u03b1\u03c6\u03ae\u03c2","handler_address":"\u0394\u03b9\u03b5\u03cd\u03b8\u03c5\u03bd\u03c3\u03b7 \u03c7\u03b5\u03b9\u03c1\u03b9\u03c3\u03c4\u03ae","handler_phone":"\u0391\u03c1\u03b9\u03b8\u03bc\u03cc\u03c2 \u03c4\u03b7\u03bb\u03b5\u03c6\u03ce\u03bd\u03bf\u03c5 \u03c7\u03b5\u03b9\u03c1\u03b9\u03c3\u03c4\u03ae"}'
        ),
        k = JSON.parse(
          '{"country":"Czechia","locale":"cs-CZ","licence":"Licence pro ve\u0159ejn\xfd p\u0159\xedstup","handler_name":"Jm\xe9no manipul\xe1tora","dog_name":"Jm\xe9no servisn\xedho psa","certified":"Certifikovan\xfd t\xfdm","expiration":"vypr\u0161en\xed platnosti","dog_breed":"Ps\xed plemeno a barva","dog_microchip":"Ps\xed mikro\u010dip","dog_service":"Ps\xed slu\u017eba poskytov\xe1na","test_date":"Datum testov\xe1n\xed ve\u0159ejn\xe9ho p\u0159\xedstupu","registration_num":"Registra\u010dn\xed \u010d\xedslo","handler_address":"Adresa obsluhy","handler_phone":"Telefonn\xed \u010d\xedslo obsluhy"}'
        ),
        w = JSON.parse(
          '{"country":"Germany","locale":"de-DE","license":"Lizenz f\xfcr \xf6ffentlichen Zugriff","handler_name":"Name des Hundef\xfchrers","dog_name":"Name des Servicehundes","certified":"Zertifiziertes Team","expiration":"Ablaufdatum","dog_breed":"Hunderasse & -farbe","dog_microchip":"Hunde-Mikrochip","dog_service":"Erbrachter Hundeservice","test_date":"Datum des \xf6ffentlichen Zugriffstests","registration_num":"Registrierungsnummer","handler_address":"Adresse des Hundef\xfchrers","handler_phone":"Telefonnummer des Hundef\xfchrers"}'
        ),
        S = JSON.parse(
          '{"country":"Denmark","locale":"da-DK","license":"Public Access License","handler_name":"Behandlers navn","dog_name":"Servicehundens navn","certified":"Certificeret team","expiration":"Udl\xf8b","dog_breed":"Hunderace og farve","dog_microchip":"Hundemikrochip","dog_service":"Hundeservice leveret","test_date":"Testdato for offentlig adgang","registration_num":"Registreringsnummer","handler_address":"Behandler adresse","handler_phone":"Behandlerens telefonnummer"}'
        ),
        _ = JSON.parse(
          '{"country":"Estonia","locale":"et-EE","litsents":"Avaliku juurdep\xe4\xe4su litsents","handler_name":"K\xe4itleja nimi","koera_nimi":"Teeninduskoera nimi","sertifitseeritud":"Sertifitseeritud meeskond","expiration":"Aegumine","dog_breed":"Koera t\xf5ug ja v\xe4rv","dog_microchip":"Koera mikrokiip","dog_service":"Pakutakse koerateenust","test_date":"Avaliku juurdep\xe4\xe4su testimise kuup\xe4ev","registration_num":"Registreerimisnumber","handler_address":"K\xe4itleja aadress","handler_phone":"Hooldaja telefoninumber"}'
        ),
        x = JSON.parse(
          '{"country":"Spain","locale":"es-ES","license":"Licencia de acceso p\xfablico","handler_name":"Nombre del adiestrador","dog_name":"Nombre del perro de servicio","certified":"Equipo certificado","expiration":"Vencimiento","dog_breed":"Raza y color del perro","dog_microchip":"Microchip del perro","dog_service":"Servicio para perros proporcionado","test_date":"Fecha de la prueba de acceso p\xfablico","registration_num":"N\xfamero de registro","handler_address":"Direcci\xf3n del adiestrador","handler_phone":"N\xfamero de tel\xe9fono del adiestrador"}'
        ),
        E = JSON.parse(
          '{"country":"Finland","locale":"fi-FI","lisenssi":"Public Access License","handler_name":"K\xe4sittelij\xe4n nimi","koiran_nimi":"Palvelukoiran nimi","sertifioitu":"Sertifioitu tiimi","expiration":"Expiration","dog_breed":"Koiran rotu ja v\xe4ri","dog_microchip":"Koiran mikrosiru","dog_service":"Koirapalvelu tarjotaan","test_date":"Julkisen p\xe4\xe4syn testausp\xe4iv\xe4m\xe4\xe4r\xe4","registration_num":"Rekister\xf6intinumero","handler_address":"K\xe4sittelij\xe4n osoite","handler_phone":"K\xe4sittelij\xe4n puhelinnumero"}'
        ),
        C = JSON.parse(
          '{"country":"France","locale":"fr-FR","url":"https://www.canidea.fr/lois-et-r%C3%A9glementation/les-lois-et-la-r%C3%A9glementation-relatives-aux-chiens-d-assistance-et-guides-d-aveugle/","license":"Licence d\'acc\xe8s public","handler_name":"Nom du ma\xeetre-chien","dog_name":"Nom du chien d\'assistance","certified":"\xc9quipe certifi\xe9e","expiration":"Expiration","dog_breed":"Race et couleur du chien","dog_microchip":"Puce \xe9lectronique pour chien","dog_service":"Service canin fourni","test_date":"Date du test d\'acc\xe8s public","registration_num":"Num\xe9ro d\'enregistrement","handler_address":"Adresse du ma\xeetre-chien","handler_phone":"Num\xe9ro de t\xe9l\xe9phone du ma\xeetre-chien"}'
        ),
        N = JSON.parse(
          '{"country":"Georgia","locale":"ka-GE","\u10da\u10d8\u10ea\u10d4\u10dc\u10d6\u10d8\u10d0":"\u10e1\u10d0\u10ef\u10d0\u10e0\u10dd \u10ec\u10d5\u10d3\u10dd\u10db\u10d8\u10e1 \u10da\u10d8\u10ea\u10d4\u10dc\u10d6\u10d8\u10d0","handler_name":"\u10db\u10db\u10e3\u10e8\u10d0\u10d5\u10d4\u10d1\u10da\u10d8\u10e1 \u10e1\u10d0\u10ee\u10d4\u10da\u10d8","dog_name":"\u10db\u10dd\u10db\u10e1\u10d0\u10ee\u10e3\u10e0\u10d4 \u10eb\u10d0\u10e6\u10da\u10d8\u10e1 \u10e1\u10d0\u10ee\u10d4\u10da\u10d8","\u10e1\u10d4\u10e0\u10d7\u10d8\u10e4\u10d8\u10ea\u10d8\u10e0\u10d4\u10d1\u10e3\u10da\u10d8":"\u10e1\u10d4\u10e0\u10d7\u10d8\u10e4\u10d8\u10ea\u10d8\u10e0\u10d4\u10d1\u10e3\u10da\u10d8 \u10d2\u10e3\u10dc\u10d3\u10d8","\u10d2\u10d0\u10d3\u10d0\u10e1\u10d5\u10da\u10d0":"\u10d5\u10d0\u10d3\u10d0","dog_breed":"\u10eb\u10d0\u10e6\u10da\u10d8\u10e1 \u10ef\u10d8\u10e8\u10d8 \u10d3\u10d0 \u10e4\u10d4\u10e0\u10d8","dog_microchip":"\u10eb\u10d0\u10e6\u10da\u10d8\u10e1 \u10db\u10d8\u10d9\u10e0\u10dd\u10e9\u10d8\u10de\u10d8","dog_service":"\u10db\u10dd\u10ec\u10dd\u10d3\u10d4\u10d1\u10e3\u10da\u10d8\u10d0 \u10eb\u10d0\u10e6\u10da\u10d4\u10d1\u10d8\u10e1 \u10e1\u10d4\u10e0\u10d5\u10d8\u10e1\u10d8","test_date":"\u10e1\u10d0\u10ef\u10d0\u10e0\u10dd \u10ec\u10d5\u10d3\u10dd\u10db\u10d8\u10e1 \u10e2\u10d4\u10e1\u10e2\u10d8\u10e1 \u10d7\u10d0\u10e0\u10d8\u10e6\u10d8","registration_num":"\u10e0\u10d4\u10d2\u10d8\u10e1\u10e2\u10e0\u10d0\u10ea\u10d8\u10d8\u10e1 \u10dc\u10dd\u10db\u10d4\u10e0\u10d8","handler_address":"\u10db\u10db\u10e3\u10e8\u10d0\u10d5\u10d4\u10d1\u10da\u10d8\u10e1 \u10db\u10d8\u10e1\u10d0\u10db\u10d0\u10e0\u10d7\u10d8","handler_phone":"Handler Phone Number"}'
        ),
        L = JSON.parse('{"country":"Gibraltar","locale":"en-GI"}'),
        T = JSON.parse(
          '{"country":"Greece","locale":"el-GR","\u03ac\u03b4\u03b5\u03b9\u03b1":"\u0386\u03b4\u03b5\u03b9\u03b1 \u03b4\u03b7\u03bc\u03cc\u03c3\u03b9\u03b1\u03c2 \u03c0\u03c1\u03cc\u03c3\u03b2\u03b1\u03c3\u03b7\u03c2","handler_name":"\u038c\u03bd\u03bf\u03bc\u03b1 \u03c7\u03b5\u03b9\u03c1\u03b9\u03c3\u03c4\u03ae","dog_name":"Service Dog Name","certified":"Certified Team","\u03bb\u03ae\u03be\u03b7":"\u039b\u03ae\u03be\u03b7","dog_breed":"Dog Breed & Color","dog_microchip":"\u039c\u03b9\u03ba\u03c1\u03bf\u03c4\u03c3\u03af\u03c0 \u03c3\u03ba\u03cd\u03bb\u03bf\u03c5","dog_service":"\u03a0\u03b1\u03c1\u03ad\u03c7\u03b5\u03c4\u03b1\u03b9 \u03c5\u03c0\u03b7\u03c1\u03b5\u03c3\u03af\u03b1 \u03b3\u03b9\u03b1 \u03c3\u03ba\u03cd\u03bb\u03bf\u03c5\u03c2","test_date":"\u0397\u03bc\u03b5\u03c1\u03bf\u03bc\u03b7\u03bd\u03af\u03b1 \u03b4\u03bf\u03ba\u03b9\u03bc\u03ae\u03c2 \u03b4\u03b7\u03bc\u03cc\u03c3\u03b9\u03b1\u03c2 \u03c0\u03c1\u03cc\u03c3\u03b2\u03b1\u03c3\u03b7\u03c2","registration_num":"\u0391\u03c1\u03b9\u03b8\u03bc\u03cc\u03c2 \u03b5\u03b3\u03b3\u03c1\u03b1\u03c6\u03ae\u03c2","handler_address":"\u0394\u03b9\u03b5\u03cd\u03b8\u03c5\u03bd\u03c3\u03b7 \u03c7\u03b5\u03b9\u03c1\u03b9\u03c3\u03c4\u03ae","handler_phone":"\u0391\u03c1\u03b9\u03b8\u03bc\u03cc\u03c2 \u03c4\u03b7\u03bb\u03b5\u03c6\u03ce\u03bd\u03bf\u03c5 \u03c7\u03b5\u03b9\u03c1\u03b9\u03c3\u03c4\u03ae"}'
        ),
        P = JSON.parse(
          '{"country":"Croatia","locale":"hr-HR","license":"Licenca za javni pristup","handler_name":"Ime rukovatelja","dog_name":"Ime slu\u017ebenog psa","certified":"Certificirani tim","expiration":"Istek","dog_breed":"Pasmina i boja psa","dog_microchip":"Pse\u0107i mikro\u010dip","dog_service":"Pru\u017eena usluga pasa","test_date":"Datum testiranja javnog pristupa","registration_num":"Registracijski broj","handler_address":"Adresa rukovatelja","handler_phone":"Broj telefona rukovatelja"}'
        ),
        A = JSON.parse(
          '{"country":"Hungary","locale":"hu-HU","licenc":"Nyilv\xe1nos hozz\xe1f\xe9r\xe9si enged\xe9ly","handler_name":"Kezel\u0151 neve","dog_name":"Szolg\xe1ltat\xf3 kutya neve","tan\xfas\xedtott":"Min\u0151s\xedtett csapat","expiration":"Lej\xe1rat","dog_breed":"Kutyafajta \xe9s sz\xedn","dog_microchip":"Kutya mikrochip","dog_service":"Kutyaszolg\xe1ltat\xe1s biztos\xedtott","test_date":"Nyilv\xe1nos hozz\xe1f\xe9r\xe9s tesztel\xe9si d\xe1tuma","registration_num":"Regisztr\xe1ci\xf3s sz\xe1m","handler_address":"Kezel\u0151 c\xedme","handler_phone":"Kezel\u0151 telefonsz\xe1ma"}'
        ),
        z = JSON.parse('{"country":"Ireland","locale":"en-IE"}'),
        j = JSON.parse(
          '{"country":"Israel","locale":"he-IL","license":"\u05e8\u05d9\u05e9\u05d9\u05d5\u05df \u05d2\u05d9\u05e9\u05d4 \u05dc\u05e6\u05d9\u05d1\u05d5\u05e8","handler_name":"\u05e9\u05dd \u05d4\u05de\u05d8\u05e4\u05dc","dog_name":"\u05e9\u05dd \u05db\u05dc\u05d1 \u05d4\u05e9\u05d9\u05e8\u05d5\u05ea","certified":"\u05e6\u05d5\u05d5\u05ea \u05de\u05d5\u05e1\u05de\u05da","expiration":"\u05ea\u05e4\u05d5\u05d2\u05d4","dog_breed":"\u05d2\u05d6\u05e2 \u05d5\u05e6\u05d1\u05e2 \u05db\u05dc\u05d1\u05d9\u05dd","dog_microchip":"\u05de\u05d9\u05e7\u05e8\u05d5-\u05e9\u05d1\u05d1 \u05dc\u05db\u05dc\u05d1","dog_service":"\u05e9\u05d9\u05e8\u05d5\u05ea \u05dc\u05db\u05dc\u05d1\u05d9\u05dd \u05de\u05e1\u05d5\u05e4\u05e7","test_date":"\u05ea\u05d0\u05e8\u05d9\u05da \u05d1\u05d3\u05d9\u05e7\u05d4 \u05e9\u05dc \u05d2\u05d9\u05e9\u05d4 \u05e6\u05d9\u05d1\u05d5\u05e8\u05d9\u05ea","registration_num":"\u05de\u05e1\u05e4\u05e8 \u05e8\u05d9\u05e9\u05d5\u05dd","handler_address":"\u05db\u05ea\u05d5\u05d1\u05ea \u05d4\u05de\u05d8\u05e4\u05dc","handler_phone":"\u05de\u05e1\u05e4\u05e8 \u05d8\u05dc\u05e4\u05d5\u05df \u05e9\u05dc \u05d4\u05de\u05d8\u05e4\u05dc"}'
        ),
        O = JSON.parse(
          '{"country":"Iceland","locale":"is-IS","license":"Almenningsa\xf0gangsleyfi","handler_name":"Nafn handhafa","dog_name":"Nafn \xfej\xf3nustuhunds","certified":"Certified Team","expiration":"Rennur \xfat","dog_breed":"Hundategund og litur","dog_microchip":"Hunda \xf6rfl\xf6ga","dog_service":"Hunda\xfej\xf3nusta veitt","test_date":"Prufudagur fyrir almennan a\xf0gang","registration_num":"Skr\xe1ningarn\xfamer","handler_address":"Heimilisfang handhafa","handler_phone":"S\xedman\xfamer afgrei\xf0slumanns"}'
        ),
        R = JSON.parse(
          '{"country":"Italy","locale":"it-IT","license":"Licenza di accesso pubblico","handler_name":"Nome del conduttore","dog_name":"Nome del cane da assistenza","certified":"Team certificato","expiration":"Scadenza","dog_breed":"Razza e colore del cane","dog_microchip":"Microchip del cane","dog_service":"Servizio fornito al cane","test_date":"Data del test di accesso pubblico","registration_num":"Numero di registrazione","handler_address":"Indirizzo del conduttore","handler_phone":"Numero di telefono del conduttore"}'
        ),
        M = JSON.parse(
          '{"country":"Japan","locale":"ja-JP","license":"\u30d1\u30d6\u30ea\u30c3\u30af \u30a2\u30af\u30bb\u30b9 \u30e9\u30a4\u30bb\u30f3\u30b9","handler_name":"\u30cf\u30f3\u30c9\u30e9\u30fc\u306e\u540d\u524d","dog_name":"\u30b5\u30fc\u30d3\u30b9 \u30c9\u30c3\u30b0\u306e\u540d\u524d","certified":"\u8a8d\u5b9a\u30c1\u30fc\u30e0","expiration":"\u6709\u52b9\u671f\u9650","dog_breed":"\u72ac\u306e\u7a2e\u985e\u3068\u8272","dog_microchip":"\u72ac\u7528\u30de\u30a4\u30af\u30ed\u30c1\u30c3\u30d7","dog_service":"\u63d0\u4f9b\u3055\u308c\u308b\u72ac\u30b5\u30fc\u30d3\u30b9","test_date":"\u30d1\u30d6\u30ea\u30c3\u30af \u30a2\u30af\u30bb\u30b9 \u30c6\u30b9\u30c8\u306e\u65e5\u4ed8","registration_num":"\u767b\u9332\u756a\u53f7","handler_address":"\u30cf\u30f3\u30c9\u30e9\u30fc\u306e\u4f4f\u6240","handler_phone":"\u30cf\u30f3\u30c9\u30e9\u30fc\u306e\u96fb\u8a71\u756a\u53f7"}'
        ),
        D = JSON.parse(
          '{"country":"South Korea","locale":"ko-KR","license":"\uacf5\uac1c \uc561\uc138\uc2a4 \ub77c\uc774\uc120\uc2a4","handler_name":"\ud578\ub4e4\ub7ec \uc774\ub984","dog_name":"\uc11c\ube44\uc2a4\uacac \uc774\ub984","certified":"\uc778\uc99d \ud300","expiration":"\ub9cc\ub8cc","dog_breed":"\uac1c \ud488\uc885 \ubc0f \uc0c9\uc0c1","dog_microchip":"\uac1c \ub9c8\uc774\ud06c\ub85c\uce69","dog_service":"\uc81c\uacf5\ub41c \uac1c \uc11c\ube44\uc2a4","test_date":"\uacf5\uac1c \uc561\uc138\uc2a4 \ud14c\uc2a4\ud2b8 \ub0a0\uc9dc","registration_num":"\ub4f1\ub85d \ubc88\ud638","handler_address":"\ud578\ub4e4\ub7ec \uc8fc\uc18c","handler_phone":"\ud578\ub4e4\ub7ec \uc804\ud654\ubc88\ud638"}'
        ),
        F = JSON.parse(
          '{"country":"Liechtenstein","locale":"de-LI","license":"Lizenz f\xfcr \xf6ffentlichen Zugang","handler_name":"Name des Hundef\xfchrers","dog_name":"Name des Diensthundes","certified":"Zertifiziertes Team","expiration":"Ablauf","dog_breed":"Hunderasse & -farbe","dog_microchip":"Hunde-Mikrochip","dog_service":"Dienstleistung f\xfcr Hunde erbracht","test_date":"Datum des \xf6ffentlichen Zugangstests","registration_num":"Registrierungsnummer","handler_address":"Adresse des Hundef\xfchrers","handler_phone":"Telefonnummer des Hundef\xfchrers"}'
        ),
        I = JSON.parse(
          '{"country":"Lithuania","locale":"lt-LT","license":"Vie\u0161os prieigos licencija","handler_name":"Apdorotojo vardas","\u0161uo_vardas":"Aptarnaujan\u010dio \u0161uns vardas","sertifikuota":"Sertifikuota komanda","galiojimo laikas":"Galiojimo laikas","dog_breed":"\u0160uns veisl\u0117 ir spalva","dog_microchip":"\u0160uns mikroschema","dog_service":"Suteikiama \u0161un\u0173 paslauga","test_date":"Vie\u0161os prieigos bandymo data","registration_num":"Registracijos numeris","handler_address":"Apdorotojo adresas","handler_phone":"Apdorotojo telefono numeris"}'
        ),
        B = JSON.parse(
          '{"country":"Luxembourg","locale":"lb-LU","license":"Public Access Lizenz","handler_name":"Numm vum Handler","dog_name":"Service Hond Numm","certified":"Zertifiz\xe9iert Team","expiration":"Verfall","dog_breed":"H\xebnn Rass a Faarf","dog_microchip":"Hund Mikrochip","dog_service":"Hondservice geliwwert","test_date":"Public Access Test Datum","registration_num":"Registrierungsnummer","handler_address":"Handler Adress","handler_phone":"Telefonsnummer vum Handler"}'
        ),
        V = JSON.parse(
          '{"country":"Latvia","locale":"lv-LV","licence":"publisk\u0101s piek\u013cuves licence","handler_name":"Apdarin\u0101t\u0101ja v\u0101rds","su\u0146a_nosaukums":"Pakalpojuma su\u0146a v\u0101rds","sertific\u0113ta":"Sertific\u0113ta komanda","expiration":"Der\u012bguma termi\u0146\u0161","dog_breed":"Su\u0146u \u0161\u0137irne un kr\u0101sa","dog_microchip":"Su\u0146a mikrosh\u0113ma","dog_service":"Nodro\u0161in\u0101ts su\u0146u pakalpojums","test_date":"Publisk\u0101s piek\u013cuves p\u0101rbaudes datums","registration_num":"Re\u0123istr\u0101cijas numurs","handler_address":"Apdarin\u0101t\u0101ja adrese","handler_phone":"Apdarin\u0101t\u0101ja t\u0101lru\u0146a numurs"}'
        ),
        H = JSON.parse(
          '{"country":"Monaco","locale":"fr-MC","license":"Licence d\'acc\xe8s public","handler_name":"Nom du ma\xeetre-chien","dog_name":"Nom du chien d\'assistance","certified":"\xc9quipe certifi\xe9e","expiration":"Expiration","dog_breed":"Race et couleur du chien","dog_microchip":"Puce \xe9lectronique pour chien","dog_service":"Service canin fourni","test_date":"Date du test d\'acc\xe8s public","registration_num":"Num\xe9ro d\'enregistrement","handler_address":"Adresse du ma\xeetre-chien","handler_phone":"Num\xe9ro de t\xe9l\xe9phone du ma\xeetre-chien"}'
        ),
        U = JSON.parse(
          '{"country":"Montenegro","locale":"hr-ME","license":"Licenca za javni pristup","handler_name":"Ime rukovatelja","dog_name":"Ime slu\u017ebenog psa","certified":"Certificirani tim","expiration":"Istek","dog_breed":"Pasmina i boja psa","dog_microchip":"Pse\u0107i mikro\u010dip","dog_service":"Pru\u017eena usluga pasa","test_date":"Datum testiranja javnog pristupa","registration_num":"Registracijski broj","handler_address":"Adresa rukovatelja","handler_phone":"Broj telefona rukovatelja"}'
        ),
        W = JSON.parse(
          '{"country":"Mexico","locale":"es-MX","license":"Licencia de acceso p\xfablico","handler_name":"Nombre del adiestrador","dog_name":"Nombre del perro de servicio","certified":"Equipo certificado","expiration":"Vencimiento","dog_breed":"Raza y color del perro","dog_microchip":"Microchip del perro","dog_service":"Servicio para perros proporcionado","test_date":"Fecha de la prueba de acceso p\xfablico","registration_num":"N\xfamero de registro","handler_address":"Direcci\xf3n del adiestrador","handler_phone":"N\xfamero de tel\xe9fono del adiestrador"}'
        ),
        q = JSON.parse(
          '{"country":"Netherlands","locale":"nl-NL","license":"Openbare toegangslicentie","handler_name":"Naam van handler","dog_name":"Naam van servicehond","certified":"Gecertificeerd team","expiration":"Vervaldatum","dog_breed":"Hondenras en kleur","dog_microchip":"Microchip van hond","dog_service":"Hondenservice verleend","test_date":"Datum openbare toegangstest","registration_num":"Registratienummer","handler_address":"Adres van handler","handler_phone":"Telefoonnummer handler"}'
        ),
        Q = JSON.parse(
          '{"country":"Norway","locale":"no-NO","license":"Lisens for offentlig tilgang","handler_name":"H\xe5ndterens navn","dog_name":"Tjenestehundens navn","certified":"Sertifisert team","expiration":"Utl\xf8p","dog_breed":"Hunderase og farge","dog_microchip":"Hundemikrochip","dog_service":"Hundetjeneste levert","test_date":"Testdato for offentlig tilgang","registration_num":"Registreringsnummer","handler_address":"Behandler adresse","handler_phone":"Behandler telefonnummer"}'
        ),
        J = JSON.parse(
          '{"country":"New Zealand","locale":"en-NZ","url":"https://assistancedogsinternational.org/resources/public-access-laws-australia-new-zealand/"}'
        ),
        K = JSON.parse(
          '{"country":"Poland","locale":"pl-PL","license":"Licencja dost\u0119pu publicznego","handler_name":"Imi\u0119 i nazwisko opiekuna","dog_name":"Imi\u0119 psa s\u0142u\u017cbowego","certyfikowany":"Certyfikowany zesp\xf3\u0142","expiration":"Wyga\u015bni\u0119cie","dog_breed":"Rasa i kolor psa","dog_microchip":"Mikroczip psa","dog_service":"Us\u0142uga \u015bwiadczona dla psa","test_date":"Data testu dost\u0119pu publicznego","registration_num":"Numer rejestracyjny","handler_address":"Adres opiekuna","handler_phone":"Numer telefonu opiekuna"}'
        ),
        Z = JSON.parse(
          '{"country":"Portugal","locale":"pt-PT","licen\xe7a":"Licen\xe7a de acesso p\xfablico","handler_name":"Nome do manipulador","dog_name":"Nome do c\xe3o de assist\xeancia","certificado":"Equipa Certificada","expira\xe7\xe3o":"Expira\xe7\xe3o","dog_breed":"Ra\xe7a e cor do c\xe3o","dog_microchip":"Microchip para c\xe3o","dog_service":"Servi\xe7o para c\xe3es fornecido","test_date":"Data do teste de acesso p\xfablico","registration_num":"N\xfamero de registo","handler_address":"Endere\xe7o do manipulador","handler_phone":"N\xfamero de telefone do manipulador"}'
        ),
        G = JSON.parse(
          '{"country":"Romania","locale":"ro-RO","license":"Licen\u021b\u0103 de acces public","handler_name":"Numele manipulatorului","dog_name":"Numele c\xe2inelui de serviciu","certified":"Echip\u0103 certificat\u0103","expiration":"Expirare","dog_breed":"Rasa \u0219i culoarea c\xe2inelui","dog_microchip":"Microcip pentru c\xe2ini","dog_service":"Serviciul pentru c\xe2ini oferit","test_date":"Data test\u0103rii accesului public","registration_num":"Num\u0103r de \xeenregistrare","handler_address":"Adresa operatorului","handler_phone":"Num\u0103rul de telefon al operatorului"}'
        ),
        X = JSON.parse(
          '{"country":"Sweden","locale":"sv-SE","license":"Public Access License","handler_name":"Handarens namn","dog_name":"Servicehundens namn","certified":"Certifierat team","expiration":"Utg\xe5ngsdatum","dog_breed":"Hundras och f\xe4rg","dog_microchip":"Hund Microchip","dog_service":"Hundservice tillhandah\xe5lls","test_date":"Testdatum f\xf6r offentlig tillg\xe5ng","registration_num":"Registration Number","handler_address":"Hanterarens adress","handler_phone":"Hantarens telefonnummer"}'
        ),
        Y = JSON.parse(
          '{"country":"Singapore","locale":"zh-Hans-SG","license":"\u516c\u5171\u8bbf\u95ee\u8bb8\u53ef\u8bc1","handler_name":"\u5904\u7406\u4eba\u5458\u59d3\u540d","dog_name":"\u670d\u52a1\u72ac\u540d\u79f0","certified":"\u8ba4\u8bc1\u56e2\u961f","expiration":"\u5230\u671f","dog_breed":"\u72ac\u79cd\u4e0e\u989c\u8272","dog_microchip":"\u72ac\u5fae\u82af\u7247","dog_service":"\u63d0\u4f9b\u7684\u72ac\u670d\u52a1","test_date":"\u516c\u5171\u8bbf\u95ee\u6d4b\u8bd5\u65e5\u671f","registration_num":"\u6ce8\u518c\u53f7","handler_address":"\u5904\u7406\u4eba\u5458\u5730\u5740","handler_phone":"\u5904\u7406\u4eba\u5458\u7535\u8bdd\u53f7\u7801"}'
        ),
        $ = JSON.parse(
          '{"country":"Slovakia","locale":"sk-SK","licence":"Licencia na verejn\xfd pr\xedstup","handler_name":"Meno handlera","dog_name":"Meno slu\u017eobn\xe9ho psa","certified":"Certifikovan\xfd t\xedm","expiration":"Expiration","dog_breed":"Pes a farba","dog_microchip":"Mikro\u010dip psa","dog_service":"Poskytovan\xe1 slu\u017eba pre psov","test_date":"D\xe1tum testovania verejn\xe9ho pr\xedstupu","registration_num":"Registra\u010dn\xe9 \u010d\xedslo","handler_address":"Adresa obsluhy","handler_phone":"Telef\xf3nne \u010d\xedslo obsluhy"}'
        ),
        ee = JSON.parse(
          '{"country":"Slovenia","locale":"sl-SL","license":"Licenca za javni dostop","handler_name":"Ime upravljavca","dog_name":"Ime slu\u017ebenega psa","certified":"Certificirana ekipa","expiration":"Potek","dog_breed":"Pasma in barva psov","dog_microchip":"Pasji mikro\u010dip","dog_service":"Zagotovljena storitev za pse","test_date":"Datum preizkusa javnega dostopa","registration_num":"Registracijska \u0161tevilka","handler_address":"Naslov upravljavca","handler_phone":"Telefonska \u0161tevilka upravljavca"}'
        ),
        te = JSON.parse(
          '{"country":"San Marino","locale":"it-SM","license":"Licenza di accesso pubblico","handler_name":"Nome del conduttore","dog_name":"Nome del cane da assistenza","certified":"Team certificato","expiration":"Scadenza","dog_breed":"Razza e colore del cane","dog_microchip":"Microchip del cane","dog_service":"Servizio fornito al cane","test_date":"Data del test di accesso pubblico","registration_num":"Numero di registrazione","handler_address":"Indirizzo del conduttore","handler_phone":"Numero di telefono del conduttore"}'
        ),
        ne = JSON.parse(
          '{"country":"Taiwan","locale":"zn-Hant-TW","license":"\u516c\u5171\u8bbf\u95ee\u8bb8\u53ef\u8bc1","handler_name":"\u5904\u7406\u4eba\u5458\u59d3\u540d","dog_name":"\u670d\u52a1\u72ac\u540d\u79f0","certified":"\u8ba4\u8bc1\u56e2\u961f","expiration":"\u5230\u671f","dog_breed":"\u72ac\u79cd\u4e0e\u989c\u8272","dog_microchip":"\u72ac\u5fae\u82af\u7247","dog_service":"\u63d0\u4f9b\u7684\u72ac\u670d\u52a1","test_date":"\u516c\u5171\u8bbf\u95ee\u6d4b\u8bd5\u65e5\u671f","registration_num":"\u6ce8\u518c\u53f7","handler_address":"\u5904\u7406\u4eba\u5458\u5730\u5740","handler_phone":"\u5904\u7406\u4eba\u5458\u7535\u8bdd\u53f7\u7801"}'
        ),
        re = JSON.parse(
          '{"country":"Ukraine","locale":"uk-UA","license":"\u041b\u0456\u0446\u0435\u043d\u0437\u0456\u044f \u0437\u0430\u0433\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u0434\u043e\u0441\u0442\u0443\u043f\u0443","handler_name":"\u0406\u043c\'\u044f \u043e\u0431\u0440\u043e\u0431\u043d\u0438\u043a\u0430","dog_name":"\u0406\u043c\'\u044f \u0441\u043b\u0443\u0436\u0431\u043e\u0432\u043e\u0433\u043e \u0441\u043e\u0431\u0430\u043a\u0438","certified":"\u0421\u0435\u0440\u0442\u0438\u0444\u0456\u043a\u043e\u0432\u0430\u043d\u0430 \u043a\u043e\u043c\u0430\u043d\u0434\u0430","expiration":"\u0417\u0430\u043a\u0456\u043d\u0447\u0435\u043d\u043d\u044f","dog_breed":"\u041f\u043e\u0440\u043e\u0434\u0430 \u0442\u0430 \u0437\u0430\u0431\u0430\u0440\u0432\u043b\u0435\u043d\u043d\u044f \u0441\u043e\u0431\u0430\u043a","dog_microchip":"\u0421\u043e\u0431\u0430\u0447\u0438\u0439 \u043c\u0456\u043a\u0440\u043e\u0447\u0456\u043f","dog_service":"\u041f\u043e\u0441\u043b\u0443\u0433\u0438 \u0441\u043e\u0431\u0430\u043a \u043d\u0430\u0434\u0430\u043d\u043e","test_date":"\u0414\u0430\u0442\u0430 \u0442\u0435\u0441\u0442\u0443\u0432\u0430\u043d\u043d\u044f \u0443 \u0432\u0456\u0434\u043a\u0440\u0438\u0442\u043e\u043c\u0443 \u0434\u043e\u0441\u0442\u0443\u043f\u0456","registration_num":"\u0420\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u0439\u043d\u0438\u0439 \u043d\u043e\u043c\u0435\u0440","handler_address":"\u0410\u0434\u0440\u0435\u0441\u0430 \u043e\u0431\u0440\u043e\u0431\u043d\u0438\u043a\u0430","handler_phone":"\u041d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0443 \u043e\u043f\u0435\u0440\u0430\u0442\u043e\u0440\u0430"}'
        ),
        ae = JSON.parse(
          '{"country":"United Kingdom","locale":"en-UK","url":"https://assistancedogsinternational.org/resources/public-access-laws-europe/"}'
        ),
        le = JSON.parse(
          '{"country":"United States","locale":"en-US","url":"https://www.ada.gov/resources/service-animals-2010-requirements/","license":"Public Access License","handler_name":"Handler\'s Name","dog_name":"Service Dog Name","certified":"Certified Team","expiration":"Expiration","dog_breed":"Dog Breed & Color","dog_microchip":"Dog Microchip","dog_service":"Dog Service Provided","test_date":"Public Access Test Date","registration_num":"Registration Number","handler_address":"Handler Address","handler_phone":"Handler Phone Number"}'
        ),
        oe = {
          al: { ...le, ...c },
          at: { ...le, ...d },
          au: { ...le, ...f },
          be: { ...le, ...p },
          bg: { ...le, ...h },
          bs: { ...le, ...m },
          ca: { ...le, ...g },
          ch: { ...le, ...v },
          cn: { ...le, ...y },
          cy: { ...le, ...b },
          cz: { ...le, ...k },
          de: { ...le, ...w },
          dk: { ...le, ...S },
          ee: { ...le, ..._ },
          es: { ...le, ...x },
          fi: { ...le, ...E },
          fr: { ...le, ...C },
          ge: { ...le, ...N },
          gi: { ...le, ...L },
          gr: { ...le, ...T },
          hr: { ...le, ...P },
          hu: { ...le, ...A },
          ie: { ...le, ...z },
          il: { ...le, ...j },
          is: { ...le, ...O },
          it: { ...le, ...R },
          jp: { ...le, ...M },
          kr: { ...le, ...D },
          li: { ...le, ...F },
          lt: { ...le, ...I },
          lu: { ...le, ...B },
          lv: { ...le, ...V },
          mc: { ...le, ...H },
          me: { ...le, ...U },
          mx: { ...le, ...W },
          nl: { ...le, ...q },
          no: { ...le, ...Q },
          nz: { ...le, ...J },
          pl: { ...le, ...K },
          pt: { ...le, ...Z },
          ro: { ...le, ...G },
          se: { ...le, ...X },
          sg: { ...le, ...Y },
          sk: { ...le, ...$ },
          sl: { ...le, ...ee },
          sm: { ...le, ...te },
          tw: { ...le, ...ne },
          ua: { ...le, ...re },
          uk: { ...le, ...ae },
          us: le,
        };
      function ie(e) {
        let { onChange: t } = e;
        function n(e) {
          let [n, r] = e;
          return (0, a.jsx)('div', {
            onClick: () => t(n),
            children: r.country,
          });
        }
        const r = Object.entries(oe)
          .sort((e, t) => {
            let [, n] = e,
              [, r] = t;
            return n.country < r.country ? -1 : 1;
          })
          .map(n);
        return (0, a.jsx)('div', { id: 'country-selector', children: r });
      }
      function ue(t) {
        let { localization: n, changeCountry: r } = t;
        const { locale: l, url: o } = n,
          [i, u] = (0, e.useState)(),
          [c, d] = (0, e.useState)(),
          [f, p] = (0, e.useState)(!1);
        function h() {
          const e = new Date(),
            t = e.toLocaleString(l, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            n = e.toLocaleString(l, {
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
            });
          d(t), u(n);
        }
        return (
          (0, e.useEffect)(
            function () {
              const e = setInterval(h, 1010);
              return () => {
                clearTimeout(e);
              };
            },
            [l]
          ),
          (0, a.jsxs)('div', {
            id: 'footer',
            children: [
              (0, a.jsx)('a', {
                href: o,
                target: '_blank',
                children: (0, a.jsx)(s.Ay, {
                  id: 'qr-code',
                  size: 128,
                  value: o,
                  viewBox: '0 0 128 128',
                }),
              }),
              (0, a.jsx)('div', { id: 'current-date', children: c }),
              (0, a.jsx)('div', { id: 'current-time', children: i }),
              (0, a.jsx)('div', {
                id: 'star-box',
                onClick: function () {
                  p(!f);
                },
                children: (0, a.jsx)('svg', {
                  viewBox: '0 0 260 245',
                  id: 'star',
                  children: (0, a.jsx)('path', {
                    d: 'm56,237 74-228 74,228L10,96h240',
                  }),
                }),
              }),
              f &&
                (0, a.jsx)(ie, {
                  onChange: function (e) {
                    p(!1), r(e);
                  },
                  localization: n,
                }),
            ],
          })
        );
      }
      const se =
          'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAUAAD/4QMwaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA5LjAtYzAwMSA3OS5jMDIwNGIyZGVmLCAyMDIzLzAyLzAyLTEyOjE0OjI0ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjAyMyBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDEwOTgxODM2RDMxMTFFRjhGQTBCNjEwODM3QkQzQUYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDEwOTgxODQ2RDMxMTFFRjhGQTBCNjEwODM3QkQzQUYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowMTA5ODE4MTZEMzExMUVGOEZBMEI2MTA4MzdCRDNBRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowMTA5ODE4MjZEMzExMUVGOEZBMEI2MTA4MzdCRDNBRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEABIODg4QDhUQEBUeFBEUHiMaFRUaIyIZGRoZGSInHiMhISMeJycuMDMwLic+PkFBPj5BQUFBQUFBQUFBQUFBQUEBFBQUFhkWGxcXGxoWGhYaIRodHRohMSEhJCEhMT4tJycnJy0+ODszMzM7OEFBPj5BQUFBQUFBQUFBQUFBQUFBQf/AABEIAYkBUQMBIgACEQEDEQH/xACMAAACAwEBAQAAAAAAAAAAAAACAwABBAUGBwEAAwEBAAAAAAAAAAAAAAAAAAECAwQQAAICAQMCBAQEBAQGAwEAAAABEQIDITEEQRJRcRMFYYEiMrEjMxSRoUJSwVMVBvDRcpJDJGKCNEQRAQEAAgMBAAICAwEBAAAAAAABEQIhMUESUTJhAyJCUpET/9oADAMBAAIRAxEAPwB3/m+TFWpTWzevRD0vzvkxNsdEnZvWdDlxw2bOCvyvmwOXpZeQ7gr8lebFc7715CvRTsHHX0mmBPHX0GlVFIeVIuA60I6jwMhIF26EgWBkJyvc8trXrgrs/uOszzXPztcm7q9tB6zNK1k5eW13XF/TR7mW0K2mqLtZtz1YKTbNsROVdjeoDq5NePDa2xtx+3XcNoeDktcuuO3xGdj6ndx+316ou3t1WnCFiL+K4aSS21AtY62TgNbGO/EsnsLgvmsct/AKtu1ynqi74WtGKdIFiE73t3u7pGPO5r0sd/HkpkqrVcpng0zt+0e4dl/RyP6XsZ7aew5XpUWgU5CRkoSI9ii3sBMWX7h0fSKyfcaKr6fkTt4qMqu0nWqlsv8A8NPNfiUsna2kpbkt/o181+JRNPQBh9AGOJoWCwmAyiQG+wQN9hhT2F22GPYXYVOLewjH+jb4Mf0EYl+Vk+FkMDIVJCglGvWtOmj/AAE2x1Sd25fRGL91lz5Zsu01rGuzvs5fQP4DqcFfkrzYjnL8w1cJfkoy879VjvSZ20cPGniTNaxJIVwklhqbUkb6aT5iNrzSPTZTxyaO0kFXSF9M3pIG1IUmztF5Krth6J7sn/5n9MHJ+jDa/SDx+Ru17W+J6T3jlRheGm3Vo8w20oF84POQKjtY28biPI1poFxeNMWezOzgxVpXQVrTXX8pxuFjok2tTY6US0F1cByJtIrtSJoSStBmTeuom2Or6Gl6gwQbDk4lLLYw5uB4HaspF2qLKbrK8zlw3xvVAKzTTW6O/m49bpyjj8njPFb4Blltph6P2jm+vh7LP66aHVR4v2/kft+TXJ0elvI9ljur1Vls1JjvMUQxEexSLZAY833GrH9q8jLm+414/sr5C26iox+oqWtpLbcEtPoJv+5BK6re0qX0Btrh1/uRXhNS+0Bh1+1AWHE0LAYbA6lQlFW2Daglqv02/AogWFWH9soVZBYcUloJxLTKvijVRTURhUZMy8vwDHAyCSEIMEtYqXvCXwEJSu61vJB3q7u1kI9K6r3N6Dpx6DhtPCkZOX+oyuBkv2w9gOTZ+pbzC9JnbpcW0Yqm2tmc7jtqiNiszbTbhG05PTCkSrBd0I1m0Tgx2S3M+e6tRqe2vVjVcx+58l4eNay+6NAzBh5j3PNjtm7cbfavjuYcdO+6KyWdruz3bNPFr9SM6vV1MGNVojRWRdNkOqiHRB12DKqENQYBsGxbYUwyWyJEZNMMgXYbQq6JphdjPyMdclYgc0A1oTSw4OTG6XdT0XsvN9TH6Nn9VdvI5fNxJpWW5l4ue3H5FbpxD1FZ9RhtMV7dFi8V1eisuqGdDEMmb7jXi/Tr5GXPubMP6dfInbqHGTvrTJad+gNpeHX+5Bt465bO/TYF/VibXijTyA+v2IGweNTT5EvUImlFVU2LCx/cXO01d66ovLWMFmvAPLCSgVmy9lOzxNMSZSmNd1fkZ8iiUOpbtsvBi8y+p/xC9HOxcdTViUo5GVeK/wAB3Gf0sVd/+1b41f4B/qPWWSAkJUZSkY8mhneO7rV326I1rTFd+RmaytV79K9EVSjqcbAq0T8TFyV+bbzOrhX5a8jmcnXLbzC9Cdt3HpNK+RsVHECuNRLHVfA2VrJtprwz2vJKrBO1j+0nb4FfJZI7epwf9wZ4x1xLd7+R6Npo85/uHFCrkfjAsHHm+vkbeFreTEdDgrqKr17dOg6pnVktynyq10Jb5bEy3dGB82iF/vasYy6LugO5GNZ0+oSy6iq5WpWLbM6vqS2QQNtcXawp5VIPqJ9SLDyNsC1iSmDbQigjka0Zyb6WOrlf0s5WXeR61l/Y9b7Rl9TgYpc2ShnQ6HE9iv8AkR0O2Y7d1MZ82/T5mvj/AKNPIx5tGbOL+jXyJ26OMtljea3qaJErDx2jadC7Y6Xzvu0SLxqrrdV2Wxc6hXtowUmlfiMy4oUwFx1FK/FDstfoFCrlsqrchXWoC3NYmjyN9yE8l7DbJqGxPMlNeDKvpRFkU1grPbV+QSrLpAPIrEeQ70PU4zmjAv8A/rXxrb8A+InsXnp28vH8a2D/AFHrJ2kH9hABbcYLvrKE2tkv2dyiq2G2hce1vivxAeR3tRdvakv4hTjt4l+WvI5PI/Vt5nYx/YvI5HKX5z8wvRa9utx/0qz4I2URh4rjGp8DbVnRp0z27M0B21CTBZaQs4P+5FHHp5/4HcbOF/uS6WClfF/4EVUeWOlw1FJOZ1g63H+nEvImtde18jL2qEYX32eg67drtvYtXXkvESsstqZRfbdG2+XDEd2pntq5q5QHEpeyNuGzuZKJNnR4+MMKlG00pM+XLBty1ipyuQ9SLVl5M9hPr3BbDpitb+kE0VeVdM0V5HchXopaPQXbG6aoiwRoyWmjZz8iNku+My3X1x5Ewt3e9hp+Q38TtrY5/tfHeHC0+sQdFIy2vNTGbNv1+Rt4qnFXyMmXfafI18VxjSJ2/U4zZMXqchpuETCq1WStdkn+BebG78jtTiSsVFR5KJzCevyLn6wq38Vzhp5D8n6bMvFcY6I05J7H4ihVzL7g0+5BX3Kp9yNdUU/JX6KvqZOeorVs35l9FX4Cr8euei7tDWzuJlYMGemS9KV1akdy6JKrXVAcbjUxWbrq02N5LTx0fWNQx/jyfpXC+9ph81dvKwvxTA4aTyQxvuKjLgfy/mKfqL+y/SIauwgYLLjNpcRt/wBy/EHvWS9e1QkgnC4inaf8SlkpfJVUWiW4VUduiXYn8DkclfnPbfxOxX7F5HJz0bytpJ6i26Gvbp4FFK+RqpsZOPZdqTexsq8a6m+lmEbQYL3CdqeILtTxKticFs85/uOy+hP5I9I7V8Uee9+4vqpZKOWtIItVI81TWy8zrxGODm4sbWRKyhnXVZQq11jDkq40E+je8zt0R03hT6ArCp00GrDi2w5ZShwvgacfHv2LxOp6LZFijqFE1wzYeP1soZu41NYIq6QMx6PQVVJyZnouw4PJTd2kd3Nb6Gzj2U5GzLbtpjhkVVXfVjnltihNJSpHdtZmNRfJxVzLwa0NJeGe0vhC5tcmll8y+7p0ewunG7fAiq04ZnseufWjGtGjLbTP80a8aMl1Of5oznZbdPZYNcVY8BwnjR6FJfQfNfEyqWbMjRxX9CE5u2HDQfE+xR/IV6OBz0tbkJVcNkw07L5KTLSevyJyK2edKrhvqTFR48l6tzaNX8i5+sK9tXHUY6z8jTZzRmTFaKKfE0WtOJiia5992Sk9ygj3ZKuLGsTWu2tEMwaKPAU/tSGYtHqbztHjLjr23fmxWdyoGWb9SyAy1X3dWTfThPF0yfMZ7lp6T8LL8QMC/N+Yz3PXFV+Fq/iKfrTv7N3ciGb1SFJw5rS/bVT2b/xBTp61a022ZeVL0qJvQDFWrvONwkyNu2k6d2a1ql1gyX4Vsl2+6E9wacudHEoZXm/VDS+LDKcUP+nW/wAx/wAwl7fZ/wDkf8xj52NOILtza0ScSmPMHJf+nW/zH49S/wDTbf5r/mN/e1Ve6JQS5lHXujQeYOSP9Nf+a/5nI92rk4nbFu5WZ3FzaWq2lHmcr3F05Na//G06hMZ4VpnPLlOLqt4i3U3UUmbLbHNarc0UcFNPT1VQC6ErYbWWNRHbboHXH1Y2CrDGCrsmNOQLPUfia+YquQvkz2Qjmf1HVu1rJzcsLJpsY7drwJJFOqYeMa6SPKLGK2P4ArF8Da6FdtepNgwzKkGC6/8AY+aOnbcw3qlm7nsRE7TPD0ODiVtiq+57eLHLhU/uf8WL4PJpbDVN6waK8mne62heBlfrKVLg43u3/FmjFRYoqthK5VFfttEeIV+XStkmlD6ixsOA8p3eVdm5WOtlmsrObNORWfL22V62T8AsNm8zs7dzaeppOsJrXiS7UoNTU42jLx9arxk02iHAJrnPRlJ6hX3YHUuE1WbWFWH8ddykQlOFrfaBvEesHRr3Gd6IuozXnpAvKpqn4aDMsfubrxSBuoo18Sb6c8Iw/rLzHe4KeP5Wr+JnxuMq8zXzNePb5MNf1p3uMXqshk9QgZLC73plxKneqwBTDiS/VUiOTw2rTj28DP8AtMv/AAxVUdOuHFu8qkZTj4nq86/mcn9nl8f5lrhZZ1tHzCYDsftsP+eo+YT42B//ANCj5nJXAt1ypf8A2Qxe2T/51/3L/mXNb/yn6/l1P23H2XIX8WW+PxkoXIU+bOavaLtNrNX/ALl/zBftd1vmr/3Ifzf+Rmfl0/2/ES//AEKfNmfkY8NKzjyd76owv262/rL/ALkMx8W2F/VZOfjIsc9YXree2dUXc7Pfoaqi81HWk/EPG5SHe2vp1WNqxEjKsDPkXd6AWdpUbBxpLGbFmz1pIinNnWrGcvBW2s/I57xY6J9u4rCy125bfUSsquY7O0NEwUtXRMy2aS5dbDZQaK2T2MmFPtQ+r6CBljPazG2egi7J2NUma1Fe6bf0zqOb0Yrj0d7OvVkE6mPJwaUVe6ID9bg/3a+ZjXtuT+4L/Tcn9wuGDX6/C/un5lrPwetp82ZF7bk/uL/03J/ePgmr9x7f1tPzCpzOFjtNLdOrMf8Apl/7gq+2WlTbQOA7PEyq+LvWzehpeRdpm4+OmPH2J7F3caCKl3csAtldS4TUn+S118R3GcRAijnHDH8aNI6bm+vcZ3ojO45LfkS8dt/Ark/rT4ltTXI/AV7p/hhTi6N3I141vIwT9aN2Rzgsvh/gLT0744MkBII2+ylsFVCZz+X7h6c0x6vxFJbcQ7cRry5ceGjd3D6I4ufmZL3bVml0RmyZsmRzZti7OEdGn9cn81nbk22Wz3YHq28TO7sisaE0rkZFtZop8jI97NmZ2JIyMfJyJ7s6Ptea+XN23s2l0ZyGpG4MmXBdXqTYrW4sr0/J0pHQXieiOXf3F5VVPQ3YbTVGdjeWXprnQisKdyO2glHrKluDfk1Whz82VzCFerrqwyMtObK7GPLMpLdjPXoviFXkYm13LYVyPki2NpwVROtjRfPhb+lC7NW1RFipLGzHesJDJOcruuhox5ZWpKpWhsXYuQWyKYMkwkt2N4OP8+si97peBv4eNPL3roTReq3QXAXaX2ksAwXAXaX2gAQWkF2kSAhIG+4aAsVCoGUyyupcJoxVmj8UM49nKQvDaE58AuO/zI8TWeIvquWvzag2tpdLqHzF+ZQF7v41YXuidRz7P6je5eF/9L/AwX+43pzif/S/wJ19VfHBhkG9jIGAvmZvSxN9Xojg2s25Y7PyL5bTZ6eBjyX3SN9NcT+UW5XZoTksxVa3vZzaBiwU/qs/4mkyQFWz2GVw266DU61UVI7DkIPp0XxK7qV2RVmJyWGDvVqMpaanO7nJrxuKhAmW0NR4nW4uWao4mWxr4maFvsZ7tNK7UtonfpAmmZNFyQ2yTkq72hDa8GkS3LJRpWNHfoIQFeBhZH7bjT8CnyHXYWuZke70HlpNoq/ArXawi/HuvtsaFyXbcnemZ2nmVj7My+7bxG4m5gdbVA0SWpKfTp0J0BTDonkuqV18SKdo8XE5F/rrHa9jqcbB6NIetnuxlKqlVVbIIytRbcYEWmCWCRJlyCiwCyEKGQ0wLBAscKgKZZTLI3FEah4P1JFY30GYnFzSeJo+VLvVsTa7fa34DuU/tZlb1YbXkTojJ90/E10f0R8DJk6eZoxv6UTread6I9Mhp7SFpeFteyblCr2nVbmt2mZQq2Oj+B14QzK2vxG11F3wNa1YFb2rpYIGnRAO4HeA2MGO0icjcEckmVAqC6bmyripjqoZpq9A1FKzPULj3i8AZRStDT8Cd5ycdvDkTGvI0c/Hba3Rj3lUGbXLTjs29DXRyc7HlVTTjy7CVKdkwu2xmvhulsb8dvEu1lYS8ZcytXMDkoHZUk9BN8iiCKfSu/oEr6GW13uiVu4DCfpq79Dq+34HWnqWX1W2POZuT2aV3OvwPfKXSx512taJ9DPfXbHEL6nTtlgVz47Ka6p9QlkoYGItFK9XsmOrjdtdiprb1CpaQUMfXAPrjS6Gk/qt74T9RhhkOh6SfQB4K+A7/VR9MYLNduOhF8NltqL5sFpDKYTUMFgQqbhV+/5g494CrpcqeEZy2lSpmb1NXN/R0+Ble49uynROZQPxfYhOYbhf0EztV6PghUkNUPDTqUwVeSSdSFsVfGrByU7DDLarp5Fqwy+oh/SxAzuXVFxWNGLnoUwyFX0Y2ttBFk3qFR6BLyKO5nHsRbcN56I2cXJNXjfyDt3bPoYaWdbSjfWMlFZbmVaQKyQ9jRizbNma1U0LdrVYjdymbRa6BvMcWvLaUML902Thf06eTKZL5U2ZnnbBmz8gwV2ye7y/gDkzdqhbiu6EJtbuYYTaLudnLGVF1G0Q8Jy6HE52XBFZmnx1PRcemXI05+lpPbxON7bwHeyyZF9PRHq+LhVUhX+uW5sObWcCw4FXzNlMaRdajVXQr5kLKlVIiQRUAFwC0EC2GAFgWUoKzF9xFVC74a28zJkxWp5G+SfTZQybrKbnU0YSU3ZoycX+qn8DO6XrbVE4sIzlKeP8ZQhzHmNy27sTXUR3N0hhteRCsuwzjv6GhWRymFgf0sidn4fJAJIapeDTi7+Iyomz1n4hpydbMbAZdthbbAL+IjLqMdhd2oAATleQUi6OGFIjFJUlEAhSLsWUx28CBHcfN2OHsJKMlOnCsu5C7oDjZJTq9zQ0mttRLjK0Wqj+xMCIcCNSQRcpCsl/AADJboVVAqZkbSreyHIztFVHV4HBeV99lFEDw/as+dptdtOrPQVw1xVWOq0Rc1TabxcaUVSg7eHHojncOk2l9DoK8OB0Rqr27BwZ62kYrsRj7SQX3aAdwATFWgt2FzIjDduDO7OTRYzXUMz2VBq5O8WpZG4JUfTJD12GZKVupRmq09Au+1dOhRUnLjsk9DJEVSNmS9mmjJaepjt2eCb9S8D0YNy8HUj0/DiEIaIeAt1CV4SAs9yL7UdvrNbs34gtv4llCMDn4lR8GMbBdhAl6MLqDZyy/AIFohUljJCEIADBUBpFuBWGClnSysuh1MaWSismctoPHnyYvtehNipXSdFHgxLTQK51Wta6gX5SeygnCsxV7MVq2R2d3AaSWn8RyJ2q6VbcVUs7PtvAyOyvdQvBmPi3x1a01PR8N17E0VIh0cOPtokhVv1GNx5NYJgx+plbtsjTxPp2FumOYBXJfcFyOZxsK7Z1Rza8nHe77XKJuFO5jySaFY5vHvKN1G20Tg2h20BbKs9gbWALbAd4Qu9hGTNAqbQrTuW6VsjnX5aom2Lp7rXuhKYJuKpv7e1wS0QZP3tbvwfgO9VOhnVLVoY/I/o7l8zAsk2H3s1hcDgo8dq20ZeXjpqUZMGSs67m6l5UBiUOblxurAw/czoZaSYlR1uzGzFPwZCEKS+fW6+Za2QNuvmF0R2skKbI2A2KmjYDZGymSAlglhAvcuAZL7h5gFCL0A7idw8wsCJq3CA7mSWibseDvScatAOq8QHZvdlCyMCaghSCVXO2gAyihfFjaU7rQgOmo/HkVemviPAdLhcWqadjv4qVrTRHD4Ttdp7I7tGlSEWk/F49TJyOZ+3raXqbMNklH8Tme6ce2SbVUwF6E7cfJyMnJy/U+1NjeNkePL2zK8TLejT2G8andeFuSp6ng5O6DtYa6ScD26tqNJnoML0ACuhWRQOeorMtBBkyXg5mfOkzXyLdqZwudktqTaqQnmcq17QvtW7Mf7m9bfQ9Cld6p6pgKjbANvH52R3VbaydtZLemvicn27hWvdWstEdu+OIRlsvUGKZk21+rDZdRFKpIZx7pWafUNejrHTJDaa2NmG6ezMvOqsd1lron9xMVk4a0HCdN2lambKuqGUu48QL3rs9GLaCEyQKKkIJ88f+JYCf1fNlz1O1klgGW2CyaYSELJMJRbKEFlFkGFEIWkwxQogXYwljH80swsJVbGqiRHA/kZAqwOh9unmwOgTbSKxwWVqs6j8VJspFV2GUtGwYJ1sGRVitTrYm+xHA4jXdL2R3sM2rUdKNleiXXcuqrazq+orJbsraOiI7qt6vxWoGXn9orebV6mbj+3WxchN7I7eO6cLoMrjq3IYgyVxcK9V/A61awhGHFWrmNWap0IpqaBvWaht6F7oRuJy6NT4HI5XFtajfU9NmwK/QyZMEqI0JU8th4OTK9oR1eN7VWut0dTHx6U6F5HGwwVTHjxKEKnusTJcGm0mO9aawUw2iU8V0Yu1vqDwuW14hr+BsZmxLNx7Vf/EHL4t206P7qaM62C/1Oj6yca84PcrL+m7Kn4Kutx7aww8tZ2M9L9t/gaskWSf8xbTgRnhkGRbxIQT5uuvmXOhF18ymdnjJAWEUTTCRllNkmEhZACJFwWkFBpJwnIVUYkikgipCtSCygLWC3Ai7WJVTqAlLGpaEznk1PoXZzBGVHUdIxbFpgouRhpwZPrVfE9RxtaKOh47HaMi8z13AtNEvgSD87irReRL6W/ADkaVZTv3JJ9AojVgt0Ojj0g5nG1sjo0ctBbwbbjUpDWmhePSqGd0og0SlhNpC1aGS1uolAvYS2noMtNhDmrJyeF2rFTJkmTfW0rUzZapuRWnHPutRqrFZRWSsPQVkyNKDOrJyW+oPFk7bpiJlgu/bb8A1FbVk7eUn0MnutPz1krug7Wb+pb6BZ16uDv6mnqL0DFl7q1t16nQTnGcjjJydTG4rAbdCdqlkLhEMsB85nV+ZRHu/MiOtmJFMtFWC9AMlEIQa0iupZS3GQ0EUkWjWJWkEUi2xkGzEtyw7MFbme3NwuDogyqllxKMpTDLtuUpWqACqyNlVepGK9BVPuXmeo9uzLReB5qtIho6vAy/VAoHf5Vu6ja6gVQM9ySHVrNdBdmZxtGzqcZS0zlYU++PE7PHrCQU2lwkUmR7Az1JNbtqWrSLSbeoe2wjVkbS0Mtm51H3nqKuvAzqorv0F2bZTcC72gWVF2mTLyHCH2uY+RadCKqAxvUvLWVPhqisY1Lu0KhUNftkmHJKtifgNxU+mH0F2r2ZJKSHBXsbNTtpKM9rJPQan9Ab3/ESci9RkFSQxyeHgn9z8wkC/ufmWmdsYiBsFILDboQJCEINAqolahwXrr7U2oWiQFCLSoFsJtCrWFbg5At6hVAGVRGvNyqmIhEQ0Sj3J0Ke5fgAXANgxbcORUG0ntnqjVxcj9ZNvcw1b3NHHtGWvmhQV6fE5R0aUilV4nP4kWukde8LtCQWh4/Hb5GnQ66p2Vkz8NJJ36mrJb6QsGS+9QwO9bA2bjQXbRCwo9W8CS2zNWz2nQfi11exJmWo2pE3UaDnk1UbAZWnoRtFSsV3DM+TcfnhIzTL0Mq0hd9EZ8tdjTfViORGhPqgVUDqUcyBjUo11rFJNJE0WOurE8lVT1NeBJrufzEczHox+JYoW61THPShz8eW1MlqW23Rqd3arqt4cEbKi5Ic/vzfEgvill5V/c/MhH9z8yjqjERTIUw2CgqqSkpGpQLWcirSLISYNUrKdgXYW7CtwMLtYAhDK3KxVQxAVQxGusxE1CyiTqMlMudgeoS3EBMW9w2B1CgSHYPvTfQUhtN0EKvS+23Tsjs2tLR532+6UHdq/pkA6vGslhkXm5dK7szZOQsPD7mcDNzbZLCtVI7lucujBvzqqu+rOA81mD6tyMqw9Bj5VbPc6GHPRrc8jXNZdTXj5jTiQyHqKOsONS7RBzeLy+5JJ+ZtvddsIV6OdsnJciFoaXR2FPE1bY5722hTRjzv8yDderVjDmq/UmA9B+FaI02a7YE4Rt9zTxI+PaG09mMzpOrBw111GZ1CDwnnuZR0srroysfNxVsu7rp/E2cnH3UscDKlWwpJexbY7ffx/7kQ4XevEhXz/ACjLjP7n5lFv7n5lGqVkgouRgaQQCsX3DhCYDsU7Ai22EiSUQhFuVIEkUkGi9dfStEkWUVJaVyVO5UlToK08LW4SYCCWwoFtkRUloZCQ2gtB1Yyrqe3t2vHhqelxP6Die04H6LyPd6Ha4+qaATtl94s68Ki8bpP+BysSTR1/e8Ttw9P6X3I81i5Lq4Zns01rqWooK9Nbmf8AcqJkv1067kL4OdVBnu7Vbhib8zWEwFmdhcjh1PbOTf1obPSVv3JHk/b13Z5R6jHCqvFj/wBSnbQphQLu9RqrKSQrK0rpIy26XCcriyFtVs9QuVZdySFq0kqaMeJSMyY+pWBtGi6lSazmM72XSsVFZr9Oo2zhGTM5ci24iolKK6afU897nwHgv3rWjPS4a9RfOwq2Jka2yjaZjx/0EOl6GL+whrllh5e33PzKJb7n5kLCEIQAkkkhQs0IQhBBC0iForWBaLKJJqlcgtlSQi7HhZCiCyFllIg4BFoFBIZUxB0TvkpjrvZpC5hHW/2/xPV5Dy2WlNEPvhN6y9FxuOsWCtF0QVPptBr7UjNkrDkuphmevrYHT5HjOVxrYs1qW8ZR66mR1tHRnO924frV76feiLMtHmu6y0kvvt2xIbwZU4dQHjunsZ2KB2PeR+OttgFS87M3cPBe15stBYDo+2YHT6rHew2Tak5+GqSSNlbqinqBxrtkVaszJt2li3d23ZbfbSTHe5rXWFZ7zbyAxObQJvk7mwsSaaZM7U62CmupqtVKsCeO1anxQeW8Vg2nEY3ms+W2jMr1Yy95kHGpsjPZpGvj00GZcSvV1YzFVIu7hwEhZcr9i/Ah0NSFofKbfc/MhLfc/MhaUIQgBRCEEELIQqQLIQoollEKJtNZCiCyELKLCBCyiFZISCTAkkjyRnw8T2nsfHri4lP7ra2PGYau2StfFnveAlXFVfAvTtGzc6LoJy40jSlpIvKpRVTHNyJ7ir37qx1NtqaQZL4NZRnzGsc29Ld2xXp1T7rLU6HppOWKy0q2TdlSMvpVjuqgsd2oSQ9Y0loD9KewptPR8/g/HaNh6vPmYq3hytg3ls9kTttPyqStswpbE8jN9MJi1a9lAjNKaRhby1huKjszZWkY0+qYvBCtX4ob3boNRWvj2dS8+SXAutkqeRjyZm7ya28IkNtY1caqZgo3ZnSwJJLxM+6o92hQU7uwWj3BaU6FEDusQMhSXym33PzKLt9z8yikLIUQYQhCwgQhCDyEKIQWQhCEEEIQgBCyiAFkIQqBAkiIJFyJtaOKvz6eZ7TiXmEuh4zjNVyp+B6vgXlJ+JcZ13ZSSkByyq6h9B0M9kKtWdDV2S56CclWiKqMWSkGa9Y1NeVtaCHqjHZrCHZwKY11FtEVcVXVwPqhC3HVyQZ7LjRjqlqzLm1u2Mtm7a/F7CnHb8WTIdrVitpV/IY7ayY8eSNBtsmtV1ZWEtOTI1hMibbH2iy7P4C8VfzI6yOiNPHpqjo10gzYa9rH931FSFTp0Ab1LmVAuRkaQHuIMnyy33PzKLe7KKQhCEAIQhACEIQAhCEAIQhACEIQAshRCoBaF6AEL/8ACHASFkHCrVieu+p6z21RiqeLx/ej2ft/6NSte6jZ2cbHpoyU+0d0HSg3ZToKu5epEBYiqhebHKMkJI33+05192ZbNIC0CWGxb3M6uAYLbqF/UBkEYHfWWX63QRYGv3iNr9VVrL3YWO3dZW8DHmHcb7ADR6lu6fA1cV99nb4mLr8jX7dtbzDgOrX6kRWi2pWLqDb7mWTR3oW7QCugF9hGP1V4kMpBk//Z',
        ce = (0, e.createContext)(null),
        de = () => {
          const t = (0, e.useContext)(ce);
          if (null == t)
            throw new Error(
              'useUserContext must be used within a UserProvider'
            );
          return t;
        };
      function fe(e) {
        let {
          localization: {
            license: t,
            handler_name: n,
            dog_name: r,
            expiration: l,
            certified: o,
          },
        } = e;
        const {
          expirationDate: i,
          orgName: u,
          ownerName: s,
          dogName: c,
        } = de();
        return (0, a.jsxs)('div', {
          id: 'content-1',
          className: 'slider-content',
          children: [
            (0, a.jsxs)('div', {
              id: 'right-bar',
              children: [
                (0, a.jsx)('img', {
                  id: 'photo',
                  src: se,
                  width: '195',
                  alt: '',
                }),
                (0, a.jsx)('div', {
                  id: 'certified',
                  children: o.toUpperCase(),
                }),
                (0, a.jsxs)('div', {
                  id: 'expiration-box',
                  children: [
                    (0, a.jsx)('h2', { children: l }),
                    (0, a.jsx)('h3', { children: i }),
                  ],
                }),
              ],
            }),
            (0, a.jsx)('h1', { children: u }),
            (0, a.jsx)('h3', { children: t }),
            (0, a.jsx)('h2', { children: n }),
            (0, a.jsx)('h3', { children: s }),
            (0, a.jsx)('h2', { children: r }),
            (0, a.jsx)('h3', { children: c }),
          ],
        });
      }
      function pe(e) {
        let {
          localization: { dog_breed: t, dog_microchip: n, dog_service: r },
        } = e;
        const { dogBreed: l, dogMicrochip: o, dogService: i } = de();
        return (0, a.jsxs)('div', {
          id: 'content-2',
          className: 'slider-content',
          children: [
            (0, a.jsx)('h2', { children: t }),
            (0, a.jsx)('h3', { children: l }),
            (0, a.jsx)('h2', { children: n }),
            (0, a.jsx)('h3', { children: o }),
            (0, a.jsx)('h2', { children: r }),
            (0, a.jsx)('h3', { children: i }),
          ],
        });
      }
      function he(e) {
        let {
          localization: {
            test_date: t,
            registration_num: n,
            handler_address: r,
            handler_phone: l,
          },
        } = e;
        const {
          testDate: o,
          registrationNum: i,
          handlerAddress: u,
          handlerPhone: s,
        } = de();
        return (0, a.jsxs)('div', {
          id: 'content-3',
          className: 'slider-content',
          children: [
            (0, a.jsx)('h2', { children: t }),
            (0, a.jsx)('h3', { children: o }),
            (0, a.jsx)('h2', { children: n }),
            (0, a.jsx)('h3', { children: i }),
            (0, a.jsx)('h2', { children: r }),
            (0, a.jsx)('h3', { children: u }),
            (0, a.jsx)('h2', { children: l }),
            (0, a.jsx)('h3', { children: s }),
          ],
        });
      }
      function me(e) {
        const { orgLogo: t } = de();
        return (0, a.jsx)('div', {
          id: 'content-4',
          className: 'slider-content',
          children: (0, a.jsx)('img', {
            id: 'org-logo',
            src: t,
            alt: '',
            width: '100%',
          }),
        });
      }
      function ge(t) {
        let { children: n } = t;
        const r = n.length,
          l = Array.from({ length: r }).map((e, t) => {
            const n = 'slider-page-num' + (0 === t ? ' active' : '');
            return (0, a.jsx)('div', { className: n }, 'page-num' + t);
          }),
          o = 500;
        let i = 0,
          u = 0,
          s = null,
          c = 0,
          d = 0,
          f = 0,
          p = 0,
          h = 0,
          m = 0,
          g = 0;
        const v = (0, e.useRef)(null),
          y = (0, e.useRef)(null);
        let b = 0,
          k = 0;
        function w() {
          let e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
          s ||
            ((s = Date.now()),
            (c = parseInt(v.current.style.left) || 0),
            (f = 0 === e ? Math.round(Math.abs(c / b)) : g + e),
            f < 0 && (f = 0),
            f > r - 1 && (f = r - 1),
            (d = -f * b),
            (function (e) {
              g = e;
              const t = Array.from(y.current.children);
              t.forEach((e) => e.classList.remove('active')),
                t[e].classList.add('active');
            })(f));
        }
        function S() {
          w(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0);
          let e = Date.now() - s;
          e > o && (e = o);
          const t = ((n = e / o), 0.5 * (Math.sin((n - 0.5) * Math.PI) + 1));
          var n;
          x(c + (d - c) * t),
            e < o ? requestAnimationFrame(() => S()) : ((u = d), (s = 0));
        }
        function _(e) {
          if ((t = e) && t.nativeEvent instanceof TouchEvent) {
            const t = e.changedTouches;
            return t.length > 1 ? 0 : 1 * t[0].pageX;
          }
          return 1 * e.screenX;
          var t;
        }
        function x(e) {
          e > 0 && (e = 0), e < k && (e = k), (v.current.style.left = `${e}px`);
        }
        const E = (e) => {
            e.preventDefault(),
              (i = _(e)),
              (b = v.current ? v.current.parentNode.offsetWidth : 0),
              (k = -n.length * b);
          },
          C = (e) => {
            if (!i) return;
            e.nativeEvent.preventDefault(), e.nativeEvent.stopPropagation();
            const t = _(e);
            x(1 * t - i + u),
              ((e) => {
                const t = Date.now();
                p && (m = (e - p) / (t - h));
                (p = e), (h = t);
              })(t);
          },
          N = (e) => {
            Math.abs(m) > 1 ? S(m < 0 ? 1 : -1) : S(), (i = 0);
          };
        return (0, a.jsxs)(a.Fragment, {
          children: [
            (0, a.jsx)(
              'div',
              {
                id: 'slider',
                ref: v,
                onTouchStart: E,
                onTouchMove: C,
                onTouchEnd: N,
                onMouseDown: E,
                onMouseMove: C,
                onMouseUp: N,
                children: n,
              },
              'sliderContent'
            ),
            (0, a.jsx)(
              'div',
              { id: 'slider-page', ref: y, children: l },
              'sliderControls'
            ),
          ],
        });
      }
      function ve(e) {
        let { localization: t } = e;
        return (0, a.jsx)('div', {
          id: 'body',
          children: (0, a.jsxs)(ge, {
            children: [
              (0, a.jsx)(fe, { localization: t }, 'content-1'),
              (0, a.jsx)(pe, { localization: t }, 'content-2'),
              (0, a.jsx)(he, { localization: t }, 'content-3'),
              (0, a.jsx)(me, { localization: t }, 'content-4'),
            ],
          }),
        });
      }
      const ye = {
          country: 'us',
          password: '',
          ...JSON.parse(localStorage.getItem('settings') || '{}'),
        },
        be = new Proxy(
          {},
          {
            set: (e, t, n) => (
              (ye[t] = n),
              (function () {
                const e = JSON.stringify(ye);
                localStorage.setItem('settings', e);
              })(),
              !0
            ),
            get: (e, t) => ye[t],
          }
        );
      const ke = Object.create(be, {});
      function we(t) {
        let { userDetails: n } = t;
        const [r, o] = (0, e.useState)(oe[ke.country]);
        return (0, a.jsx)(ce.Provider, {
          value: n,
          children: (0, a.jsxs)('div', {
            className: 'App',
            children: [
              (0, a.jsx)(l, {}),
              (0, a.jsx)(u, { localization: r }),
              (0, a.jsx)(ve, { localization: r }),
              (0, a.jsx)(ue, {
                localization: r,
                changeCountry: function (e) {
                  (ke.country = e), o(oe[ke.country]);
                },
              }),
            ],
          }),
        });
      }
      const Se = (t) => {
          let { onSubmit: n } = t;
          const [r, l] = (0, e.useState)('');
          return (0, a.jsx)('div', {
            className: 'password-container',
            children: (0, a.jsxs)('form', {
              onSubmit: (e) => {
                e.preventDefault(), n(r);
              },
              className: 'password-form',
              children: [
                (0, a.jsx)('input', {
                  type: 'password',
                  value: r,
                  onChange: (e) => l(e.target.value),
                  placeholder: 'Password',
                  required: !0,
                }),
                (0, a.jsx)('button', { type: 'submit', children: 'Submit' }),
              ],
            }),
          });
        },
        _e = {
          expirationDate:
            'q+YVNwdR8CXCPIsGNoDLOEpey2ILB0DsbI2W8ZE3mxmFZFOTucM=',
          orgName:
            'frbDuWoYlo6bA4sWk6suUQNSGigK/xocuLTDj7rSBKpCxhZMseGqBp7f43GGpDsmNolcymWF',
          ownerName: 'd8QpWdlwLTdn/xXmDym/wIxXgtyFe/7S3mmnzvbCYL8FhUdzWQ==',
          dogName: 'qQ4Q+9Y4n7XcQC1VD6xzLPcoYLTiqPc7Fx4PUsmHmVHOpH0=',
          dogBreed:
            'JEPb+Fm/kQfCG7RuaxKMpylT1rnBEjbs1QOjpkqW3P/IoKiN7G7/VJNHtyhRnlMlgrEJE70KmGj+AA==',
          dogMicrochip:
            'K7U0fZ+3iyHL2pop98CUj+XFzKiXLs5LxjQadaOqbqrTTLaMbr/IpAFclQ==',
          dogService:
            'R18D0Rj3m1W6iRz0/oxuuBtY78AsH4Gq4s3Fidn2kapRPHxTT5CVEnDPU+sOYUop4sVUhrEOYnc=',
          testDate: 'AHVqJZtV5/z6eMzyYKKuuCRY+68yqb8S1I5zhOmDEkwu+okOvJ0=',
          registrationNum:
            'oYcYI1fof2x1aS4U7jWRn9hfqL2TNPryRgPCEFdbbbYOygl+c6o=',
          handlerAddress:
            'MwwrGbgkLToL2WYMvLgzPZE2PmE7kTjhKmw607712JXFrluMpjttwjdDhZ02mMpqNPwIgaUCI+v8+jZ1FvSF3ls=',
          handlerPhone:
            'y9LM1MjluT1QGRWx1dnkCZsf/m2/oE/laOItEqLL+dtIATjPoMQ6Lw==',
          orgLogo:
            'OMnIYvOC1mEe4cQCBy3JFfuRnIRE1rG4ZP6GVrs2qwmKqZqxg/dsOpldHOiuHtcWQvkfSCSag50Vv5wmtH5VOe4=',
        };
      function xe(e, t) {
        if (!{}.hasOwnProperty.call(e, t))
          throw new TypeError('attempted to use private field on non-instance');
        return e;
      }
      var Ee = 0;
      function Ce(e) {
        return '__private_' + Ee++ + '_' + e;
      }
      var Ne = Ce('key'),
        Le = Ce('password');
      class Te {
        constructor(e) {
          Object.defineProperty(this, Ne, { writable: !0, value: null }),
            Object.defineProperty(this, Le, { writable: !0, value: null }),
            (xe(this, Le)[Le] = e);
        }
        set password(e) {
          if (!e.length) throw new Error('Password cannot be empty');
          (xe(this, Le)[Le] = e), (xe(this, Ne)[Ne] = null);
        }
        async deriveKey() {
          if (!xe(this, Le)[Le]) throw new Error('Password is not set');
          if (xe(this, Ne)[Ne]) return xe(this, Ne)[Ne];
          const e = new TextEncoder(),
            t = await crypto.subtle.importKey(
              'raw',
              e.encode(xe(this, Le)[Le]),
              'PBKDF2',
              !1,
              ['deriveBits', 'deriveKey']
            );
          return (
            (xe(this, Ne)[Ne] = await crypto.subtle.deriveKey(
              {
                name: 'PBKDF2',
                salt: e.encode('salt'),
                iterations: 1e5,
                hash: 'SHA-256',
              },
              t,
              { name: 'AES-GCM', length: 256 },
              !1,
              ['encrypt', 'decrypt']
            )),
            xe(this, Ne)[Ne]
          );
        }
        async encrypt(e) {
          const t = await this.deriveKey(),
            n = new TextEncoder(),
            r = crypto.getRandomValues(new Uint8Array(12)),
            a = await crypto.subtle.encrypt(
              { name: 'AES-GCM', iv: r },
              t,
              n.encode(e)
            ),
            l = new Uint8Array(a),
            o = new Uint8Array(r.byteLength + l.byteLength);
          return (
            o.set(r, 0),
            o.set(l, r.byteLength),
            btoa(String.fromCharCode.apply(null, [...o]))
          );
        }
        async decrypt(e) {
          const t = await this.deriveKey(),
            n = new TextDecoder(),
            r = Uint8Array.from(atob(e), (e) => e.charCodeAt(0)),
            a = r.slice(0, 12),
            l = r.slice(12),
            o = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: a }, t, l);
          return n.decode(o);
        }
      }
      async function Pe(e) {
        const t = await (async function (e) {
            const t = new TextEncoder().encode(e),
              n = await crypto.subtle.digest('SHA-256', t);
            return Array.from(new Uint8Array(n))
              .map((e) => e.toString(16).padStart(2, '0'))
              .join('');
          })(e),
          n = new Te(t),
          r = {};
        for (const [a, l] of Object.entries(_e)) r[a] = await n.decrypt(l);
        return r;
      }
      const Ae = () => {
        const [t, n] = (0, e.useState)(null),
          [r, l] = (0, e.useState)(localStorage.getItem('password'));
        return (
          (0, e.useEffect)(() => {
            r &&
              ((e, t) => {
                Pe(e)
                  .then((n) => {
                    t(n), localStorage.setItem('password', e);
                  })
                  .catch((e) => {
                    console.error('Decryption failed:', e);
                  });
              })(r, n);
          }, [r]),
          t
            ? (0, a.jsx)(we, { userDetails: t })
            : (0, a.jsx)(Se, { onSubmit: l })
        );
      };
      t
        .createRoot(document.getElementById('root'))
        .render((0, a.jsx)(e.StrictMode, { children: (0, a.jsx)(Ae, {}) })),
        document.addEventListener('touchmove', (e) => e.preventDefault, {
          passive: !1,
        });
    })();
})();
//# sourceMappingURL=main.801db08b.js.map
